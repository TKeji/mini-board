const moment = require("moment")
const Post = require("../models/post").Post

const newPostForm = (req, res, next)=>{
  res.render("new")
}

const createPost = async (req, res)=>{
  post = new Post(req.body.content, {username: req.body.author})
  await post.save()
  res.redirect("/posts")
}

const viewPosts = async (req, res)=>{
  // Get posts from db 
  const skip = 0
  const noPostsPerPage = 100
  postsArray = await Post.fetchAll(skip, noPostsPerPage)
  // Add on the image url & timestamp 
  postsArray.forEach((post)=>{
    post.lastModified = moment(post._id.getTimestamp()).fromNow()
    post.imageURL = `https://avatars.dicebear.com/v2/gridy/${post._id.toString()}.svg`
  })
  res.render("index", {posts: postsArray})
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