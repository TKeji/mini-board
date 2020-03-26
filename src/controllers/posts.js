const moment = require("moment")
const Post = require("../models/post")

const newPostForm = (req, res, next)=>{
  res.render("new", {
    username: res.locals.user.name, 
    loggedIn: req.session.isLoggedIn
  })
}

const createPost = async (req, res)=>{
  const author = {
    _id : res.locals.user._id, 
    username: res.locals.user.name, 
    imageURL: res.locals.user.avatarURL
  }
  const post = new Post(req.body.content, author)
  console.log(post)
  await post.save()
  res.redirect("/posts")
}

const viewPosts = async (req, res)=>{
  // Get posts from db 
  const skip = 0
  const noPostsPerPage = 100
  const postsArray = await Post.fetchAll(skip, noPostsPerPage)
  // Add on the image url & timestamp 
  postsArray.forEach((post)=>{
    post.lastModified = moment(post._id.getTimestamp()).fromNow()
    // post.imageURL = `https://avatars.dicebear.com/v2/gridy/${post._id.toString()}.svg`
  })
  console.log(postsArray)
  console.log("-----Posts----\n",req.session)
  console.log("-----Posts: Locals----\n",res.locals)
  res.render("index", {
    posts: postsArray,
    loggedIn: req.session.isLoggedIn
  })
}

const editPost = async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id)
  } catch(e){
    console.log("Error", e.message)
    return res.redirect("/", {error: e.message})
  }
  res.render("edit", {
    post,
    loggedIn: req.session.isLoggedIn
  })
}

const updatePost = async (req, res)=>{
  try{
    updateQuery = {
      message: req.body.content
    }
    await Post.update(req.params.id, updateQuery)
    res.redirect("/")
  }catch(e){
    console.log("Error", e.message)
    res.redirect("/")
  }
}

const deletePost = async (req, res)=>{
  try{
    await Post.deleteById(req.params.id)
  } catch(e){
    console.log("Error", e.message)
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