//INIT
let express = require("express");
let ejs = require("ejs");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");

let app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//mongoose
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posts", {useNewUrlParser: true, useUnifiedTopology: true});

//MODELS
let Post = require("./models/posts.js");
let Comment = require("./models/comments.js");

//ROUTES

//Default
app.get("/", (req, res) => {
  res.render("landing.ejs");
});

//Get all posts
app.get("/posts", (req,res) => {

  Post.find({}, (err, posts) => {
    if(err){
      console.log(err);
    }
    else {
      res.render("posts.ejs", {posts: posts});
    }
  });
});

//Creating a new post page
app.get("/posts/new", (req, res) => {
  res.render("new_post.ejs");
});


//Getting the form data for posts
app.post("/posts", (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let image = req.body.image;
  let content = req.body.content;

  let post = {
    title: title,
    image: image,
    author: author,
    content: content
  }

  Post.create(post, (err, post) => {
    if(err){
      console.log(err);
    }
    else {
      res.redirect("/posts");
    }
  });
});

//Show the full post
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id).populate("comments").exec((err, post) => {
    if(err) {
      console.log(err);
    }
    else {
      res.render("show_post.ejs", {post: post});
    }
  });
});

//Show the edit page
app.get("/posts/:id/edit", (req,res) => {
  let id = req.params.id;
  Post.findById(id, (err, post) => {
    if(err){
      console.log(err);
    }
    else {
      res.render("edit_post.ejs", {post: post})
    }
  });
});

//editing the post
app.put("/posts/:id", (req, res) => {
  let id = req.params.id;
  let post = {
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    content: req.body.content
  }
  Post.findByIdAndUpdate(id, {title: req.body.title,
  image: req.body.image,
  author: req.body.author,
  content: req.body.content}, (err, post) => {
    if(err){
      console.log(err);
    }
    else {
      res.redirect("/posts");
    }
  });
});

//deleting the post
app.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findByIdAndRemove(id, (err, post) => {
    if(err) {
      console.log(err);
    }
    else {
      res.redirect("/posts");
    }
  });
});

//adding comments
app.post("/posts/:id/comments", (req, res) => {
  let id = req.params.id;

  Post.findById(id, (err, post) => {
    if(err){
      console.log(err);
    }
    else {
      Comment.create({content: comment}, (err,comment) => {
        if(err){
          console.log(err);
        }
        else {
          post.comments.push(comment);
          post.save();
          res.redirect("/posts/" + post._id);
        }
      });
    }
  })
  let comment = req.body.comment;


});

//Universal route
app.get("*", (req,res) => {
  res.send("wrong page");
});

//Listen
app.listen(3000, () => {
  console.log("Working");
})
