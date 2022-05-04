const express = require ("express");

const Post = require("../models/post");

const router = express.Router();


router.post("", (req, res, next) => {
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

router.get("", (req, res, next) => {
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
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
router.put("/:id",(req, res, next)=>{
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

router.delete("/:id",(req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then((response)=>{
    // console.log(response)
    res.status(200).json({
      message: "post deleted successfully"
    })
  })

})

module.exports = router;
