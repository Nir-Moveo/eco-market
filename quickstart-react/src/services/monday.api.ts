import * as _ from "lodash";
import mondaySdk from "monday-sdk-js";

import { Categories, Columns, Context, Groups, ICard, IColumnValues, RawItem } from "../types/types";
import { formatMutation } from "../utils/utils";

const monday = mondaySdk();

// Context
export const fetchContext = () => {
  return monday.get("context");
};

// Storage
export const storageGetItem = async (key: string) => {
  return monday.storage.instance.getItem(key).then((res) => res.data.value);
};

export const storageSetItem = async (key: string, value: any) => {
  return monday.storage.instance.setItem(key, value);
};

export const setColumnIdsToStorage = async (columnIds: string[]) => {
  return Promise.all(
    columnIds.map((c) => {
      if (new RegExp(`^${Columns.Category}`).test(c)) return storageSetItem(Columns.Category, c);
      else if (new RegExp(`^${Columns.Name}`).test(c)) return storageSetItem(Columns.Name, c);
      else if (new RegExp(`^${Columns.Description}`).test(c)) return storageSetItem(Columns.Description, c);
      else if (new RegExp(`^${Columns.Images}`).test(c)) return storageSetItem(Columns.Images, c);
      else if (new RegExp(`^${Columns.Interested}`).test(c)) return storageSetItem(Columns.Interested, c);
    })
  );
};

export const columnIdsFromStorage = async (columnNames: string[]) => {
  const ids = await Promise.all(
    columnNames.map(async (c) => {
      const id = await storageGetItem(c);
      return { [c]: id };
    })
  );
  return Object.assign({}, ...ids);
};

export const setGroupIdsToStorage = (groups: string[]) => {
  return Promise.all([
    storageSetItem(Groups.Active, groups.filter((g: string) => g.match(`^${Groups.Active}`))[0]),
    storageSetItem(Groups.Sold, groups.filter((g: string) => g.match(`^${Groups.Sold}`))[0]),
  ]);
};

// Groups
const createGroup = async (boardId: number, name: string) => {
  const {
    data: {
      create_group: { id: groupId },
    },
  }: any = await monday.api(`mutation{
    create_group(board_id:${boardId}, group_name:${name}){
      id
    }
  }`);
  return groupId;
};

export const initializeGroups = async (boardId: number) => {
  await createGroup(boardId, Groups.Active).then(async (id) => {
    await storageSetItem(Groups.Active, id);
  });
  await createGroup(boardId, Groups.Sold).then(async (id) => {
    await storageSetItem(Groups.Sold, id);
  });
};

export const fetchGroups = async (boardId: number) => {
  const {
    data: { boards },
  }: any = await monday.api(`query{
    boards(ids: ${boardId}){
      groups{
        id
      }
    }
  }`);
  return boards[0].groups.map((g: { id: string }) => g.id);
};

export const moveItemToGroup = async (itemId: number, groupName: Groups) => {
  const groupId = await storageGetItem(groupName);
  return monday.api(`mutation {
    move_item_to_group (item_id: ${itemId}, group_id: "${groupId}") {
      id
    }
  }`);
};

// Columns
const createColumn = async (boardId: number, title: Columns, columnType: string): Promise<string> => {
  const {
    data: {
      create_column: { id: columnId },
    },
  }: any = await monday.api(`mutation{
    create_column(board_id: ${boardId}, title: "${title}", column_type: ${columnType}){
      id
    }
  }`);
  return columnId;
};

export const initializeColumns = async (boardId: number) => {
  await createColumn(boardId, Columns.Name, "text").then(async (id) => {
    await storageSetItem(Columns.Name, id);
  });
  await createColumn(boardId, Columns.Description, "text").then(async (id) => {
    await storageSetItem(Columns.Description, id);
  });
  await createColumn(boardId, Columns.Interested, "people").then(async (id) => {
    await storageSetItem(Columns.Interested, id);
  });
  await createColumn(boardId, Columns.Images, "file").then(async (id) => {
    await storageSetItem(Columns.Images, id);
  });
  await createColumn(boardId, Columns.Category, "text").then(async (id) => {
    await storageSetItem(Columns.Category, id);
  });
};

export const fetchColumns = async (boardId: number) => {
  const {
    data: { boards },
  }: any = await monday.api(`query{
    boards(ids: ${boardId}){
      columns{
        id
      }
    }
  }`);
  return boards[0].columns.map((c: { id: string }) => c.id);
};

// Items
export const addNewItem = async (item: RawItem) => {
  const boardId = await storageGetItem(Context.BoardID);
  const columns = await columnIdsFromStorage([Columns.Description, Columns.Category, Columns.Images]);
  const groupId = await storageGetItem(Groups.Active);

  const {
    data: {
      create_item: { id: itemId },
    },
  }: any = await monday.api(`
      mutation {
        create_item(
          board_id: ${boardId},
          group_id: "${groupId}",
          item_name: "${item.name}",
          column_values:"{\\\"${columns[Columns.Description]}\\\":\\\"${item.description}\\\",\\\"${
    columns[Columns.Category]
  }\\\":\\\"${item.category}\\\"}"){
          id
        }
      }
  `);

  if (item.images?.length) await addImagesToItem(itemId, columns[Columns.Images], item.images);
};

export const editItem = async (
  itemId: number,
  valuesToUpdate: { [Columns.Name]?: string; [Columns.Description]?: string; [Columns.Category]?: Categories }
) => {
  const boardId = await storageGetItem(Context.BoardID);
  const columnIds = await columnIdsFromStorage([Columns.Name, Columns.Description, Columns.Category]);

  // Create the mutation to update the item
  const columnValues = Object.entries(valuesToUpdate)
    .map(([key, value]) => formatMutation(columnIds[key], value))
    .join(",");

  const updatedItem = await monday
    .api(
      `mutation {
        change_multiple_column_values(item_id:${itemId}, board_id:${boardId}, column_values:"{${columnValues}}") {
              id
              name
              created_at
              creator {
                id
                name 
                phone
                email
                photo_tiny 
              } 
              column_values{ 
                title 
                text 
                value
                type
              } 
        }
      }
    `
    )
    .then((res: any) => res.data.change_multiple_column_values);

  return formatItems([updatedItem]);
};

export const deleteItem = async (itemId: number) => {
  return monday.api(`mutation {
    delete_item (item_id: ${itemId}) {
        id
    }
  }`);
};

export const addImagesToItem = async (itemId: number, columnId: string, images: FileList) => {
  for (let i = 0; i < images.length; i++) {
    await monday.api(
      `mutation ($file: File!){
      add_file_to_column (item_id: ${itemId}, column_id:"${columnId}", file: $file) {
        id
      }
    }`,
      { variables: { file: images[i] } }
    );
  }
};

export const deleteImageFromItem = async (itemId: number, imageUrl: string) => {
  const boardId = await storageGetItem(Context.BoardID);
  const { images: imagesColumnId } = await columnIdsFromStorage([Columns.Images]);
  // Query the relevant item to get the images value
  const rawFiles = await monday
    .api(
      `
        query { 
          boards(ids: ${boardId}){
            items(ids: [${itemId}]) { 
            column_values{ 
              title 
              value
            } 
          } 
        }
      }`
    )
    .then((res: any) => {
      // Syphon only the value from the response
      return res.data.boards[0].items[0].column_values.filter((c: any) => c.title === Columns.Images)[0].value;
    });
    // Parse string to objects
  let files = JSON.parse(rawFiles);
  // get the relevant imageId from the image url
  const imageId = +imageUrl.split("/").slice(-2)[0];
  // use the id to filter out the files that need to be deleted
  files.files = files.files.filter((f: { assetId: number }) => f.assetId != imageId);
  // format the value for the files to be mutated
  files = JSON.stringify(files).replace(/"/g, '\\"');


  return monday.api(
    `mutation {
      change_multiple_column_values(item_id: ${itemId}, board_id: ${boardId}, column_values:"{\\\"${imagesColumnId}\\\":${files}}"){
        id
      }
    }`
  )
}

export const getItemsByGroup = async (group: Groups): Promise<ICard[]> => {
  const boardId = await storageGetItem(Context.BoardID);
  const groupId = await storageGetItem(group);

  const rawItems = await monday
    .api(
      `
        query { 
          boards(ids: ${boardId}){
            items  { 
              id
              name
              group {
                id
              }
              created_at
              creator {
                id
                name 
                phone
                email
                photo_tiny 
              } 
            column_values{ 
              title 
              text 
              value
              type
            } 
          } 
        }
      }`
    )
    .then((res: any) => {
      return res.data.boards[0].items;
    });

  // Filter items by group
  const filteredItems = rawItems.filter((i: any) => i.group.id === groupId);

  return formatItems(filteredItems);
};

export const getItemsByCategory = async (category: Categories, group: Groups): Promise<ICard[]> => {
  const boardId = await storageGetItem(Context.BoardID);
  const categoryColumnId = await storageGetItem(Columns.Category);
  const groupId = await storageGetItem(group);

  const rawItems = await monday
    .api(
      `
        query { 
          items_by_column_values(board_id: ${boardId}, column_id: "${categoryColumnId}", column_value: "${category}"){
            id
            name
            group {
              id
            }
            created_at
            creator { 
              id
              name 
              phone
              email
              photo_tiny 
            } 
            column_values{ 
              title 
              text 
              value
              type
          } 
        }
      }`
    )
    .then((res: any) => {
      return res.data.items_by_column_values;
    });

  // Filter items by group
  const filteredItems = rawItems.filter((i: any) => i.group.id === groupId);

  return formatItems(filteredItems);
};

export const getItemsByIds = async (itemIds: number[], group: Groups) => {
  const boardId = await storageGetItem(Context.BoardID);
  const groupId = await storageGetItem(group);

  const rawItems = await monday
    .api(
      `
        query { 
          boards(ids: ${boardId}){
            items(ids: [${itemIds.join(",")}]) { 
              id
              name
              group {
                id
              }
              created_at
              creator { 
                id
                name 
                phone
                email
                photo_tiny 
              } 
            column_values{ 
              title 
              text 
              value
              type
            } 
          } 
        }
      }`
    )
    .then((res: any) => {
      return res.data.boards[0].items;
    });

  // Filter items by group
  const filteredItems = rawItems.filter((i: any) => i.group.id === groupId);

  return formatItems(filteredItems);
};

export const getMyItems = async (group?: Groups): Promise<ICard[]> => {
  let filteredItems;
  const boardId = await storageGetItem(Context.BoardID);
  const userId = await storageGetItem(Context.UserID);
  const [activeId, soldId] = await Promise.all([storageGetItem(Groups.Active), storageGetItem(Groups.Sold)]);
  const groupIds = {
    [`${Groups.Active}`]: activeId,
    [`${Groups.Sold}`]: soldId,
  };

  const rawItems = await monday
    .api(
      `
        query { 
          boards(ids: ${boardId}){
            items  { 
              id
              name
              group {
                id
              }
              created_at
              creator { 
                id
                name 
                phone
                email
                photo_tiny 
              } 
            column_values{ 
              title 
              text 
              value
              type
            } 
          } 
        }
      }`
    )
    .then((res: any) => {
      return res.data.boards[0].items;
    });

  // Filter out items that do not belong to the user
  const myItems = rawItems.filter((i: any) => i.creator.id === +userId);

  // If no specific group was selected return all
  if (!group) {
    filteredItems = myItems.filter((i: any) => i.group.id === activeId || i.group.id === soldId);
  } else filteredItems = myItems.filter((i: any) => i.group.id === groupIds[group]);

  return formatItems(filteredItems);
};

const formatItems = async (items: any[]): Promise<any[]> => {
  const data = await Promise.all(
    items.map(async (item: any) => {
      let phone_number;
      let images;
      let description;
      let interested;
      let category;

      await Promise.all(
        item.column_values?.map(async (c: IColumnValues) => {
          switch (c.title) {
            case Columns.Description:
              description = c.text;
              break;
            case Columns.Images:
              images = c.text.split(`, `);
              break;
            case Columns.Category:
              category = c.text;
              break;
            case Columns.Interested:
              if (c.value) {
                const userIds = JSON.parse(c.value).personsAndTeams?.map((u: any) => u.id);
                interested = await fetchInterested(userIds);
                break;
              }
              interested = [];
              break;
          }
        })
      );

      return {
        id: item.id,
        name: item.name,
        description,
        images,
        category,
        interested,
        owner: {
          id: item.creator?.id,
          display_name: item.creator?.name,
          profile_picture: item.creator?.photo_tiny,
          email: item.creator?.email,
          phone: item.creator?.phone,
        },
        created_at: item.created_at,
        phone_number,
      };
    })
  );
  return _.orderBy(data, ["created_at"], ["desc"]);
};

// Users
export const fetchInterested = async (userIds: number[]): Promise<{ display_name: string; profile_picture: string }[]> => {
  const {
    data: { users },
  }: any = await monday.api(`query{
      users(ids:[${userIds}]){
        id
        name
        photo_tiny
      }
    }`);

  return users.map((u: any) => ({ id: u.id, display_name: u.name, profile_picture: u.photo_tiny }));
};

// Wishlist
export const addToWishlist = async (itemId: number) => {
  const boardId = await storageGetItem(Context.BoardID);
  const userId = await storageGetItem(Context.UserID);
  const { interested: interestedColumnId } = await columnIdsFromStorage([Columns.Interested]);

  const rawInterested = await monday
    .api(
      `query{
      boards(ids:${boardId}){
        items(ids:${itemId}){
          column_values(ids:"${interestedColumnId}"){
            value
          }
        }
      }
    }`
    )
    .then((res: any) => {
      return res.data.boards[0].items[0].column_values;
    });

  // Create the interested users array
  let interestedUsers;
  if (rawInterested.length && rawInterested[0].value) {
    const users = JSON.parse(rawInterested[0].value);

    // Check if the user is already interested in this item
    users.personsAndTeams = users.personsAndTeams.filter((u: { id: number; kind: string }) => u.id !== +userId);

    // if (users.personsAndTeams.filter((u: { id: number; kind: string }) => u.id === +userId).length) return;
    // If there are already interested people add to them
    users.personsAndTeams.push({
      id: +userId,
      kind: "person",
    });

    interestedUsers = `{\\\"personsAndTeams\\\":[${users.personsAndTeams
      .map((p: any) => `{${formatMutation("id", p.id)},${formatMutation("kind", "person")}}`)
      .join(",")}]}`;
  } else
    interestedUsers = `{\\\"personsAndTeams\\\":[{${formatMutation("id", +userId)},${formatMutation(
      "kind",
      "person"
    )}}]}`;

  return monday.api(
    `mutation {
        change_multiple_column_values(item_id:${itemId}, board_id:${boardId}, column_values:"{\\\"${interestedColumnId}\\\":${interestedUsers}}") {
          id
        }
      }
    `
  );
};

export const removeFromWishlist = async (itemId: number) => {
  const boardId = await storageGetItem(Context.BoardID);
  const userId = await storageGetItem(Context.UserID);
  const { interested: interestedColumnId } = await columnIdsFromStorage([Columns.Interested]);

  const rawInterested = await monday
    .api(
      `query{
      boards(ids:${boardId}){
        items(ids:${itemId}){
          column_values(ids:"${interestedColumnId}"){
            value
          }
        }
      }
    }`
    )
    .then((res: any) => {
      return res.data.boards[0].items[0].column_values;
    });

  // Create the interested users array
  let interestedUsers;
  if (rawInterested.length) {
    const users = JSON.parse(rawInterested[0].value);
    // Check if the user is already interested in this item
    users.personsAndTeams = users.personsAndTeams.filter((u: { id: number; kind: string }) => u.id !== +userId);
    interestedUsers = `{\\\"personsAndTeams\\\":[${users.personsAndTeams
      .map((p: any) => `{${formatMutation("id", p.id)},${formatMutation("kind", "person")}}`)
      .join(",")}]}`;

    return monday.api(
      `mutation {
        change_multiple_column_values(item_id:${itemId}, board_id:${boardId}, column_values:"{\\\"${interestedColumnId}\\\":${interestedUsers}}") {
          id
        }
      }
    `
    );
  }
  return;
};

export const getWishlist = async () => {
  const userId = await storageGetItem(Context.UserID);
  const items = await getItemsByGroup(Groups.Active);

  return items.filter((item) => item.interested.filter((i) => i.id === +userId).length);
};

// Notifications
export const createNotification = async (userId: number, boardId: number, text: string) => {
  return monday.api(
    `mutation{
      create_notification(user_id:${userId}, target_id:${boardId},text: "${text}", target_type: Project){
        text
      }
    }`
  )
}