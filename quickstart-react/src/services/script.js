import mondaySdk from "monday-sdk-js";
import * as _ from 'lodash';

const monday = mondaySdk();

export const createNewBoard = async () => {
  const {boardId} = await monday.get("context")
  console.log("board",boardId);
  await monday.storage.instance.setItem("board_id", boardId)
  const user_id = monday.api(
    `query {
      me {
        id
        }
    }
    `).then((res)=> {
      console.log("user",res);
      return res.data.me.id})
    await monday.storage.instance.setItem("my_id", user_id)
    const groups = await monday.get(
      `query {
        boards(ids:${(await monday.storage.instance.getItem("board_id")).data.value}){
          groups {
            id
          }
        }
     }`
    ).then((res)=> {
      console.log("groups",res);
      return res.data.boards[0].groups } )
    if(!groups.includes({"id":"active_items"})){
        await Promise.all([
          monday.api(
            `mutation{
              create_group(board_id:${monday.storage.instance.getItem("board_id").data.value}, group_name:"active_items"){
                id
              }
            }`
          ),
          monday.api(
            `mutation{
              create_group(board_id:${monday.storage.instance.getItem("board_id").data.value}, group_name:"sold_items"{
                id
              }
            }`
          )
        ])
        const { description, images, interested , phone_number, category} = await Promise.all([
        monday.api(`
        mutation{
        create_column(board_id: ${monday.storage.instance.getItem("board_id").data.value}, title:"description", description: "This is the item description", column_type:text) {
         id
       }
     }
    `).then((res)=> res.data.create_column.id),
    monday.api(`
            mutation{
            create_column(board_id: ${monday.storage.instance.getItem("board_id").data.value}, title:"images", description: "This is the item images", column_type:file) {
             id
           }
         }
        `).then((res)=> res.data.create_column.id),
        monday.api(`
            mutation{
            create_column(board_id: ${monday.storage.instance.getItem("board_id").data.value}, title:"interested", description: "This is the people that interested in the item", column_type:people) {
             id
           }
         }
        `).then((res)=> res.data.create_column.id),
        monday.api(`
            mutation{
            create_column(board_id: ${monday.storage.instance.getItem("board_id").data.value}, title:"phone_number", description: "This is the item phone number", column_type:text) {
             id
           }
         }
        `).then((res)=> res.data.create_column.id),
        monday.api(`
        mutation{
        create_column(board_id: ${monday.storage.instance.getItem("board_id").data.value}, title:"category", description: "This is the item category", column_type:text) {
         id
       }
     }
    `).then((res)=> res.data.create_column.id),
        ])
        await Promise.all([
          monday.storage.instance.setItem("description", description),
          monday.storage.instance.setItem("images", images),
          monday.storage.instance.setItem("interested", interested),
          monday.storage.instance.setItem("phone_number", phone_number),
          monday.storage.instance.setItem("category", category),
        ])
        console.log("description",description);
        console.log("images",images);
        console.log("interested",interested);
        console.log("category",category);
    } 
  
};