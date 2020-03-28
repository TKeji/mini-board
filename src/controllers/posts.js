const moment = require("moment")
const Post = require("../models/post")

const newPostForm = (req, res, next)=>{
  console.log("Session", req.session)
  res.render("new", {
    username: res.locals.user.name, 
    loggedIn: req.session.isLoggedIn, 
    csrfToken: req.csrfToken(), 
    userId: req.session.userId
  })
}

const createPost = async (req, res)=>{
  const author = {
    _id : res.locals.user._id, 
    username: res.locals.user.name, 
    imageURL: res.locals.user.avatarURL
  }
  const post = new Post(req.body.content, author)
  try{
    await post.save()
    req.session.message = "Post Created"
  } catch(e){
    console.log(e.message)
    req.session.error = "Unable to Create Post"
  }
  res.redirect("/posts")
}

const viewPosts = async (req, res)=>{
  // Get posts from db 
  const skip = 0
  const noPostsPerPage = 100
  const postsArray = await Post.fetchAll(undefined, skip, noPostsPerPage)
  // Add on the image url & timestamp 
  postsArray.forEach((post)=>{
    post.lastModified = moment(post.updatedAt).fromNow()
    post.isAuthorized = false
    if (req.session.userId){
      post.isAuthorized = post.author._id.toString() === req.session.userId.toString()
    }
  })
  const error = req.session.error
  const message = req.session.message
  delete req.session.error
  delete req.session.message
  const userId = req.session.userId
  res.render("index", {
    posts: postsArray,
    loggedIn: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
    error,
    message, 
    userId
  })
}

const editPost = async (req, res)=>{
  let post
  try{
    post = await Post.findById(req.params.id)
  } catch(e){
    console.log("Error", e.message)
    return res.redirect("/", {error: e.message})
  }
  res.render("edit", {
    post: post,
    loggedIn: req.session.isLoggedIn, 
    csrfToken: req.csrfToken(), 
    userId: req.session.userId
  })
}

const updatePost = async (req, res)=>{
  let message 
  try{
    updateQuery = {
      message: req.body.content,
      updatedAt: Date.now()
    }
    await Post.update(req.params.id, updateQuery)
  }catch(e){
    console.log("Error", e.message)
    error = "Update Error"
    req.session.error = error
    res.redirect("/")
  }
  req.session.message = "Post Updated"
  res.redirect("/")
}

const deletePost = async (req, res)=>{
  try{
    await Post.deleteById(req.params.id)
    req.session.message = "Post Deleted"
  } catch(e){
    console.log("Error", e.message)
    req.session.error = "Unable to Delete Post"
  }
  res.redirect("/")
}


module.exports = {
  newPostForm,
  createPost, 
  viewPosts, 
  editPost,
  updatePost, 
  deletePost
}