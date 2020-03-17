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
  res.send("READ /:id ROUTE IS UNDER CONSTRUCTION")
}

const editPost = async (req, res)=>{
  try{
    // Get user from db 
    console.log(req.params)
    const post = await Post.findById(req.params.id)
    res.render("edit", post)
  } catch(e){
    console.log(e.message)
    res.redirect("/", {error: e.message})
  }
}

const updatePost = async (req, res)=>{
  console.log("--------------")
  try{
    updateQuery = {
      message: req.body.content
    }
    await Post.update(req.params.id, updateQuery)
    res.redirect("/")
  }catch(e){
    console.log(e.message)
    // throw new Error("Unable to find post")
  }
}

const deletePost = (req, res)=>{
  res.send(" Delete /:id ROUTE IS UNDER CONSTRUCTION")
}


module.exports = {
  newPostForm,
  createPost, 
  viewPosts, 
  viewPost,
  editPost,
  updatePost, 
  deletePost
}