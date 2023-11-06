//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogDB',{useNewUrlParser: true});


const homeStartingContent = "Write your Journal here.";
const aboutContent = "In this website you can note down your daily Journal and publish in it.";
const contactContent = "Gmail: tenchime27@gmail.com";



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema= new mongoose.Schema({
  title: String,
  content: String,
});

const Post= mongoose.model("Post",postSchema);

app.get("/", async(req, res)=>{
  try{
    const posts=await Post.find({});
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      })
    }
    catch(err){
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
    });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save().then(()=>{
    res.redirect("/");
  }).catch((err)=>{
    console.log(err);
  })
  });


app.get("/posts/:postId", async(req, res)=>{
  const requestedPostId = req.params.postId;

  try{
    const post=await Post.findOne({_id:requestedPostId});
    if(post){
    res.render("post.ejs", {
      post:post
      });
    }else{
      console.log("Post not found");
    }}
  catch(err){
    console.log(err);
  }
 });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
