import mondaySdk from "monday-sdk-js";
import * as _ from "lodash";

import { Columns, Groups, ICard, IColumnValues, RawItem } from "../types/types";

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

export const columnIdsFromStorage = async (columnNames: string[]) => {
  const ids = await Promise.all(
    columnNames.map(async (c) => {
      const id = await storageGetItem(c);
      return { [c]: id };
    })
  );
  return Object.assign({}, ...ids);
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

export const moveItemToGroup = async (itemId: number, groupName: string) => {
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
  const {
    data: { boardId },
  } = await fetchContext();
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

export const getAllItems = async (): Promise<ICard[]> => {
  const { data } = await fetchContext();
  const boardId = data.boardId;

  const rawItems = await monday
    .api(
      `
        query { 
          boards(ids: ${boardId}){
            items  { 
              id
              name
              created_at
              creator { 
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

  const resData = Promise.all(
    rawItems.map(async (item: any) => {
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
              }
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

  return resData;
};

export const deleteItem = async (itemId: number) => {
  return monday.api(`mutation {
    delete_item (item_id: ${itemId}) {
        id
    }
  }`);
};

// Users
const fetchInterested = async (userIds: number[]): Promise<{ display_name: string; profile_picture: string }[]> => {
  const {
    data: { users },
  }: any = await monday.api(`query{
      users(ids:[${userIds}]){
        name
        photo_tiny
      }
    }`);

  return users.map((u: any) => ({ display_name: u.name, profile_picture: u.photo_tiny }));
};

//add item to user wishlist (add the user to item interested)
export const addToWishList = async (itemId: number) => {
  const {
    data: {
      boardId,
      user: { id: userId },
    },
  } = await fetchContext();
  const interestedId = await columnIdsFromStorage([Columns.Interested]);

  const rawUsers = await monday
    .api(
      `query{
      boards(ids:${boardId}){
        items(ids:${itemId}){
          column_values(ids:${interestedId}){
            value
          }
        }
      }
    }`
    )
    .then((res: any) => {
      return res.data.boards[0].items[0].column_values[0].value;
    });
  const users = JSON.parse(rawUsers);
  const allUsers = JSON.stringify(
    users.personsAndTeams.push({
      id: userId,
      kind: "person",
    })
  );

  return monday.api(
    `mutation {
        change_multiple_column_values(item_id:${itemId}, board_id:${boardId}, column_values:"{\\\"${interestedId}\\\":{\\\"personsAndTeams\\\":${allUsers}}}") {
          id
        }
      }
    `
  );
};

// //edit item (name , description , phone number)
// export const editItem = async (item_id, item) => {
//   if (item.name) {
//     monday.api(`mutation {
//       change_simple_column_value(item_id:${item_id}, board_id:${
//       storageGetItem("board_id")
//     }, column_id:"name",value: ${item.name}) {
//         id
//       }
//     }`);
//   }
//   if (item.description) {
//     monday.api(`mutation {
//       change_simple_column_value(item_id:${item_id}, board_id:${
//       storageGetItem("board_id")
//     }, column_id:${
//       storageGetItem("description")
//     },value: ${item.description}) {
//         id
//       }
//     }`);
//   }
//   if (item.phone_number) {
//     monday.api(`mutation {
//       change_simple_column_value(item_id:${item_id}, board_id:${
//       storageGetItem("board_id")
//     }, column_id:${
//       storageGetItem("phone_number")
//     },value: ${item.phone_number}) {
//         id
//       }
//     }`);
//   }
//   if (item.category) {
//     monday.api(`mutation {
//       change_simple_column_value(item_id:${item_id}, board_id:${
//       storageGetItem("board_id")
//     }, column_id:${
//       storageGetItem("category")
//     },value: ${item.category}) {
//         id
//       }
//     }`);
//   }
// };

// //delete all photos from item
// export const removeAllPhotosFromItem = async (item_id) => {
//   monday.api(
//     `mutation {
//        change_column_value (item_id: ${item_id}, column_id:${
//       storageGetItem("images")
//     }, board_id: board_id:${
//       storageGetItem("board_id")
//     }, value:"{\\"clear_all\\": true}") { id } }
//   `
//   );
// };

// //remove item from wishlist
// export const removeFromWishList = async (item_id) => {
//   const rawUsers = monday
//     .api(
//       `query{
//       boards(ids:${storageGetItem("board_id")}){
//         items(ids:${item_id}){
//           column_values(ids:${
//             storageGetItem("interested")
//           }){
//             value
//           }
//         }
//     }
//     }
//   `
//     )
//     .then((res) => {
//       return res.data.boards[0].items[0].column_values[0].value;
//     });
//   const users = JSON.parse(rawUsers);
//   const leftUsers = _.filter(users.personsAndTeams, (res) => {
//     if (res.id == storageGetItem("my_id"))
//       return false;
//     return true;
//   });
//   const allUsers = JSON.stringify(leftUsers);
//   monday.api(
//     `mutation {
//         change_multiple_column_values(item_id:${item_id}, board_id:${
//       storageGetItem("board_id")
//     }, column_values: "{\"${
//       storageGetItem("interested")
//     }\" : {\"personsAndTeams\":${allUsers}}}") {
//           id
//         }
//       }
//     `
//   );
// };
