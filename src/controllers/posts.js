const Post = require("../models/post").Post

const newPostForm = (req, res, next)=>{
  res.render("new")
}

const createPost = async (req, res)=>{
  console.log(req.body)
  console.log(" Create ROUTE IS UNDER CONSTRUCTION")
  post = new Post(req.body.content, {username: req.body.author})
  await post.save()
  res.redirect("/posts")
}

const viewPosts = (req, res)=>{
  res.render("index")
}

const viewPost = (req, res)=>{
  res.send(" /:id ROUTE IS UNDER CONSTRUCTION")
}

const updatePost = (req, res)=>{
  res.send("Edit /:id ROUTE IS UNDER CONSTRUCTION")
}

const deletePost = (req, res)=>{
  res.send(" Delete /:id ROUTE IS UNDER CONSTRUCTION")
}


module.exports = {
  newPostForm,
  createPost, 
  viewPosts, 
  viewPost,
  updatePost, 
  deletePost
}