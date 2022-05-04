const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://binayakhotta:Spbr1995@freecluster.5ubcq.mongodb.net/mean-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware is app.use
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });

});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((document) => {
      // console.log(document);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: document,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
app.put("/api/posts/:id",(req, res, next)=>{
  const post = new Post({
    _id : req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result => {
    console.log(result)
    res.status(200).json({ message: "Update successful!" });
  });
})

app.delete("/api/posts/:id",(req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then((response)=>{
    // console.log(response)
    res.status(200).json({
      message: "post deleted successfully"
    })
  })

})

//we need to export
module.exports = app;
