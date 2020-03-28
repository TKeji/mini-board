const User = require("../models/user")
const Post = require("../models/post")

// passes if authenticated, else goes to login page
const isAuthenticated = (req, res, next)=>{
  if (req.session.userId){
    return next()
  }
  // req.session.isLoggedIn = false
  return res.redirect("/users/login")
}


// Check if i'm the owner of the post
const isAuthorized = async(req, res, next)=>{
  // user is authorized to enter this route
  try{
    const post = await Post.findById(req.params.id)
    req.post = post 
  
    // Check if the current session user is authorized 
    if (req.session.userId.toString() !== post.author._id.toString()){
      throw new Error("Unauthorized")
    }
    next()

  }catch(e){
    console.log(e.message)
    res.redirect("/")
  }
  // next()
}


module.exports = {
  isAuthenticated, 
  isAuthorized
}