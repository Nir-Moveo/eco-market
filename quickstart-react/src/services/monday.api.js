import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

//add new item to board
export const addNewItem = async (item) => {
  const item_id = await monday.api(`
      mutation {
        create_item(
          board_id: ${monday.storage.instance.getItem("board_id").data.value},
          group_id: 'active_items',
          item_name: ${item.name}
          column_values:"{
            \"${monday.storage.instance.getItem("description").data.value}\": \"${item.description}\",
            \"${monday.storage.instance.getItem("category").data.value}\": \"${item.category}\",
            \"${monday.storage.instance.getItem("phone_number").data.value}\": \"${item.phone_number}\",
          }"
        ){
          id
        }
      }
  `)

  item.images?.map((file)=>{
    monday.api(`mutation add_file(${file_content}: File!) {
      add_file_to_column (item_id: ${item_id}, column_id:${monday.storage.instance.getItem("images").data.value}, file: ${file}) {
          id
      }
    }`)
  })
  
}

//get All items from board
export const getAllItems = async () => {
  const rawItems = monday.api(`
  query { 
    boards(ids:${monday.storage.instance.getItem("board_id").data.value}){
   items  { 
     name 
     created_at
     creator { 
       name 
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
 }
  `).then((res)=>{
    return res.data.boards[0].items
  })

  const data = _.reduce(rawItems,(all,item)=>{
      let item_phone_number;
      let item_images;
      let item_description;
      let item_interested;
      let item_category;
      item.column_values.map((column)=>{
        switch(column.title){
          case "phone_number":
            item_phone_number = column.text;
            break;
          case "description" :
            item_description = column.text;
            break;
          case "images":
            item_images = column.text.split(`, `)
            break;
            case "category":
              item_category = column.text;
              break;
          case "interested":
            const rawData = JSON.parse(column.value);
            const users_ids = rawData.personsAndTeams.map((user)=> {return user.id});
            item_interested = monday.api(
              `query{
              users(ids:${users_ids}){
                name
                photo_tiny
              }
            }`).then((res)=> {
              return _.reduce(res.users,(all,item)=>{
                return [
                  ...all,
                  {
                    display_name:item.name,
                    profile_picture:item.photo_tiny
                  }
                ]
            },[])
            });
            break;
        }
      })
    return [
      ...all,
      {
        item_id:item.id,
        item_name:item.name,
        item_description,
        item_images,
        item_category,
        item_interested,
        item_owner:{
          display_name:item.creator.name,
          profile_picture:item.creator.photo_tiny
        },
        item_created_at:item.created_at,
        item_phone_number,
      }
    ]
  },[])
}

//add item to user wishlist (add the user to item interested)
export const addToWishList = async (item_id) =>{
  const rawUsers = monday.api(
    `query{
      boards(ids:${monday.storage.instance.getItem("board_id").data.value}){
        items(ids:${item_id}){
          column_values(ids:${monday.storage.instance.getItem("interested").data.value}){
            value
          }
        }
    }
    }
  `).then((res)=> {return res.data.boards[0].items[0].column_values[0].value})
    const users = JSON.parse(rawUsers)
    const allUsers = JSON.stringify(users.personsAndTeams.push({id:monday.storage.instance.getItem("board_id").data.value,kind:"person"}))
    monday.api(
      `mutation {
        change_multiple_column_values(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_values: "{\"${monday.storage.instance.getItem("interested").data.value}\" : {\"personsAndTeams\":${allUsers}}}") {
          id
        }
      }
    `)
}

//edit item (name , description , phone number)
export const editItem = async (item_id,item) =>{
  if(item.name){
    monday.api(`mutation {
      change_simple_column_value(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_id:"name",value: ${item.name}) {
        id
      }
    }`)
  }
  if(item.description){
    monday.api(`mutation {
      change_simple_column_value(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_id:${monday.storage.instance.getItem("description").data.value},value: ${item.description}) {
        id
      }
    }`)
  }
  if(item.phone_number){
    monday.api(`mutation {
      change_simple_column_value(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_id:${monday.storage.instance.getItem("phone_number").data.value},value: ${item.phone_number}) {
        id
      }
    }`)
  }
  if(item.category){
    monday.api(`mutation {
      change_simple_column_value(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_id:${monday.storage.instance.getItem("category").data.value},value: ${item.category}) {
        id
      }
    }`)
  }

}

//add photo to item
export const addPhotoToItem = async (item_id,file) =>{
  monday.api(`mutation add_file($file_content: File!) {
    add_file_to_column (item_id: ${item_id}, column_id:${monday.storage.instance.getItem("images").data.value}, file: ${file}) {
        id
    }
  }`)
}

//delete all photos from item
export const removeAllPhotosFromItem = async (item_id) =>{
  monday.api(
    `mutation {
       change_column_value (item_id: ${item_id}, column_id:${monday.storage.instance.getItem("images").data.value}, board_id: board_id:${monday.storage.instance.getItem("board_id").data.value}, value:"{\\"clear_all\\": true}") { id } }
  `)
}

//remove item from wishlist
export const removeFromWishList = async (item_id) =>{
  const rawUsers = monday.api(
    `query{
      boards(ids:${monday.storage.instance.getItem("board_id").data.value}){
        items(ids:${item_id}){
          column_values(ids:${monday.storage.instance.getItem("interested").data.value}){
            value
          }
        }
    }
    }
  `).then((res)=> {return res.data.boards[0].items[0].column_values[0].value})
    const users = JSON.parse(rawUsers)
    const leftUsers =  _.filter(users.personsAndTeams,((res)=>{
      if(res.id == monday.storage.instance.getItem("my_id").data.value) return false
      return true
    }))
    const allUsers = JSON.stringify(leftUsers)
    monday.api(
      `mutation {
        change_multiple_column_values(item_id:${item_id}, board_id:${monday.storage.instance.getItem("board_id").data.value}, column_values: "{\"${monday.storage.instance.getItem("interested").data.value}\" : {\"personsAndTeams\":${allUsers}}}") {
          id
        }
      }
    `)
}

//move item to sold group
export const moveItemToSold = async (item_id)=>{
  monday.api(`mutation {
    move_item_to_group (item_id: ${item_id}, group_id: "sold_items") {
        id
    }
}`)
}

//move item to active group
export const moveItemToActive = async (item_id)=>{
  monday.api(`mutation {
    move_item_to_group (item_id: ${item_id}, group_id: "active_items") {
        id
    }
}`)
}

//delete item
export const deleteItem = async (item_id) =>{
  monday.api(`mutation {
    delete_item (item_id: ${item_id}) {
        id
    }
}`)
}