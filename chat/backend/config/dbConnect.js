const mongoose = require('mongoose');

//BD_CLOUD_URI
//BD_LOCAL_URL
const connectDB = ()=>{
    mongoose.connect(process.env.BD_LOCAL_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
   }).then(succ=>console.log("mongodb Connected succefully"))
   .catch(err=>console.log(err));
 }
 
 module.exports = connectDB;
