const express = require("express");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/testDB",{useNewUrlParser: true,serverSelectionTimeoutMS: 30000});

const app = express();
const userSchema= new mongoose.Schema({
    name:String,
    age: Number
});

const userModel=mongoose.model("users",userSchema);

app.get("/",(req,res)=>{
    const id='6517f500e1dd5622d95a7c97';
    userModel.findById(id,'name').then(function(users){
        res.json(users);
        console.log(users._id);
    }).catch(function(err){
        console.log(err);
    })
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
