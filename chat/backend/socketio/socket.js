
const mongoose = require('mongoose')
const Message = require('../model/Message');
const User = require('../model/User');
const fs = require('fs');
const axios = require('axios');
//var user=0;
//const sockets = new Set();

const {
    addNewUser,
    removeUser,
    allUsersIds,
    userCount,
    allUsersSocketIds
} = require('./controllers/user.controller');


//const online_users = new Map();

const socketio = (io)=>{

io.on('connection', async (socket)=>{
    // console.log("connected user num:",++user);
    // sockets.add(socket.id);
  
    //send geeting to new user and request his id
     io.to(socket.id).emit("greeting");

    //store my db id with socket id
    await new Promise(resolve=>{
      socket.on("myDataBaseId",(user_data)=>{
        if(user_data.id){
          addNewUser(user_data,socket.id); 
        //  console.log("online users count: ",[...allUsersIds().keys()]);
          resolve(user_data)
        }
    });
  });   
      
      //emit active users to all users
       await new Promise(resolve=>{
        const activeUsersIds =  [...allUsersIds().keys()];
        io.emit("get_active_users",activeUsersIds,answer=>{
          resolve(answer);
        })
      });
        
   
    //handle sendding private message 
   socket.on("sendPrivateMessage",async(data)=>{
    if(data.message && data.message !== undefined){
    await sendMessage(null,data.recieverId,data.senderId,data.senderName,data.message);
  }

   
  if(allUsersSocketIds().has(data.recieverId))
    io.to(allUsersSocketIds().get(data.recieverId)).emit("message-sent-success",{
      message : data.message,
      senderId : data.senderId,
      recieverId : data.recieverId
    });
    
    io.to(allUsersSocketIds().get(data.senderId)).emit("message-sent-success",{
      message : data.message,
      senderId : data.senderId,
      recieverId : data.recieverId
    });

  });
 
/*
   socket.on("file_uploading",(data)=>{
     console.log("file-uploaded data: ",data);
 
   });*/
 
   //typingmessage...
   socket.on("typingMessage",(data)=>{
    // console.log("typing message ,",data);
     if(allUsersSocketIds().get(data.recieverId)){
       io.to(allUsersSocketIds().get(data.recieverId)).emit("typingMessageGet",{
         senderId:data.senderId,
         recieverId:data.recieverId,
         message:data.message
       });
     }
   });
  
   //get friends
   await new Promise(resolve=>{
    socket.on("getFriends",async(myid)=>{
      try{
        friends = await getFriends(myid);
        console.log("get friends: ",friends);
     socket.emit("getFriends_success",friends);
      }catch(err){
        console.log(err.message)
      }
      resolve(myid)
     });
   });
   

   //get conversation between you and you friend
   socket.on("getConversation",async(data)=>{
    const senderId=data.senderId;
    const recieverId=data.recieverId;
    
      const allMessage = await getConversation(senderId,recieverId);

       //send message to both sender and reciver
       if(allUsersSocketIds().has(data.recieverId) ){
        io.to(allUsersSocketIds().get(data.recieverId)).emit("Messages-Get-Success",{
          senderId:data.senderId,
          recieverId:data.recieverId,
          message:Array.from(allMessage)
        });
      }

      if( allUsersSocketIds().has(data.senderId)){
        io.to(allUsersSocketIds().get(data.senderId)).emit("Messages-Get-Success",{
          senderId:data.senderId,
          recieverId:data.recieverId,
          message:Array.from(allMessage)
        });
      }  

   });
 
   socket.on('fileSend',async(data)=>{
    const {file,bufferFile}=data;

    //console.log("file send",file);
    const path =__dirname+"/../public/bufferFiles/";

    console.log("file",file);
    const buf = Buffer.name;
  /*  fs.writeFile(path+'file3.jpg', bufferFile, function (err) {
      if (err) return console.log(err);
       
    });*/
   });

     //handle disconnection 
     socket.on('disconnect',()=>{

         if(userCount()>0){
             removeUser(socket.id);
             const activeUsersIds =  [...allUsersIds().keys()];
             //after any of users become online update active users again
             io.emit("get_active_users",activeUsersIds); 
         }
     });
 });
}

async function getFriends(myid) {
  try {
    const url = `http://localhost:8080/api/profile/following-following/get/${myid}`;
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = response.data;
    //console.log(data);
    // Access the properties in the response
    const message = data.message;
    const status = data.status;
    const users = data.data;

    // Access user details
    /*for (const user of users) {
      const id = user.id;
      const username = user.username;
      const email = user.email;
      const imageUrl = user.image_url;
      const accessToken = user.accessToken;
      // Use the user details as needed
      console.log(id, username, email, imageUrl, accessToken);
    }*/
    return users;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

async function sendMessage(image, receiverId, senderId, senderName, text) {
  try {
    const url = 'http://localhost:8080/api/message/send/text';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const data = {
      image,
      receiverId,
      senderId,
      senderName,
      text
    };

    const response = await axios.post(url, data, { headers });
    console.log("send message resp: ",response.data);
    return true;
    // Handle the response data as needed
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

async function getConversation(senderId, receiverId) {
  try {
    const url = `http://localhost:8080/api/message/get/conversation/${senderId}/${receiverId}`;
    const headers = {
      'Accept': 'application/json'
    };

    const response = await axios.get(url, { headers });
    console.log("get conversation resp: ",response.data);
    return response.data;
    // Handle the response data as needed
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};


module.exports = {socketio};
