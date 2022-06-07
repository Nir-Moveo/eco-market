import mondaySdk from "monday-sdk-js";
import * as _ from "lodash";

const monday = mondaySdk();

export const createNewBoard = async () => {
  let  description, images, interested, phone_number, category;
  console.log("context", await monday.get("context"));

  const boardId = await monday.get("context").then((res) => {
    return res.data.boardId;
  });
  console.log("board", boardId);
   await monday.storage.instance.setItem("board_id", boardId);
  const user_id = await monday.get("context").then((res) => {
    return res.data.user.id;
  });
   await monday.storage.instance.setItem("my_id", user_id);
  const groups = await monday
    .api(
      `query {
        boards(ids:${boardId}){
          groups {
            id
          }
        }
     }`
    )
    .then((res) => {
      console.log("groups", res);
      return res.data.boards[0].groups;
    });
    const regex = new RegExp("^active_items")
    const include = _.reduce(groups,(all,current)=>{
      if(regex.test(current.id)) all = true
      return all
    },false);
    console.log(include);
  if (!include) {
      const group_active = await monday.api(
        `mutation{
              create_group(board_id:${boardId}, group_name:"active_items"){
                id
              }
            }`
      )
        await monday.storage.instance.setItem("active_items", group_active.data.create_group.id)
         const group_sold = await monday.api(
          `mutation{
                create_group(board_id:${boardId}, group_name:"sold_items"){
                  id
                }
              }`
        )
      

       description = await monday
        .api(
          `
        mutation{
        create_column(board_id: ${boardId}, title:"description", description: "This is the item description", column_type:text) {
         id
       }
     }
    `
        )
        .then((res) => {return res.data.create_column.id} )


         images = await monday
          .api(
            `
              mutation{
              create_column(board_id: ${boardId}, title:"images", description: "This is the item images", column_type:file) {
               id
             }
           }
          `
          )
          .then((res) => {return res.data.create_column.id})
          interested = await monday
          .api(
            `
              mutation{
              create_column(board_id: ${boardId}, title:"interested", description: "This is the people that interested in the item", column_type:people) {
               id
             }
           }
          `
          )
          .then((res) =>  {return res.data.create_column.id})
 
          phone_number = await monday
          .api(
            `
              mutation{
              create_column(board_id: ${boardId}, title:"phone_number", description: "This is the item phone number", column_type:text) {
               id
             }
           }
          `
          )
          .then((res) => res.data.create_column.id)

          category = await  monday
          .api(
            `
          mutation{
          create_column(board_id: ${boardId}, title:"category", description: "This is the item category", column_type:text) {
           id
         }
       }
      `
          )
          .then((res) => res.data.create_column.id)

    await Promise.all([
      monday.storage.instance.setItem("description", description),
      monday.storage.instance.setItem("images", images),
      monday.storage.instance.setItem("interested", interested),
      monday.storage.instance.setItem("phone_number", phone_number),
      monday.storage.instance.setItem("category", category),
    ]).then(()=>{
      console.log("description", description);
      console.log("images", images);
      console.log("interested", interested);
      console.log("category", category);
    });
  } else{
    console.log("nooooo");
  }
};
