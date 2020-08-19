const bcrypt = require("bcryptjs")
const moment = require("moment")
const User = require("../models/user")
const Post = require("../models/post")
const {isEmail, isLength, isURL, trim} = require("validator")


// /users/new
const signupPage = async (req, res)=>{
  const message = req.session.message
  const error = req.session.error
  delete req.session.error
  delete req.session.message
  res.render("sign-up", {
    error: error, 
    csrfToken: req.csrfToken(), 
    message
  })
}

const signup = async (req, res)=>{
  let {name, email, password, imageURL} = req.body
  name = trim(name)
  email = trim(email)
  password = trim(password)
  imageURL = trim(imageURL)
  try{
    // Sanitization of inputs 
    if(!isLength(name, {min:3})){
      throw new Error("Name must be more than 2 characters")
    } else if (!isURL(imageURL) && imageURL){
      throw new Error("Invalid URL")
    } else if (!isLength(password, {min:2, max:16})){
      throw new Error("Password must be between 2 and 16 characters long")
    } else if (!isEmail(email)){
      throw new Error("Invalid email")
    } 

    const newUser = new User(name, email, password,  imageURL)
    const user = await User.create(newUser)
    // Add user id to sessoin
    req.session.userId = user._id
  } catch(e){
    console.log(e.message)
    req.session.error = e.message
    return res.redirect('/users/new')
  }
  console.log(req.session)
  res.status(201).redirect("/")
}

const loginPage = async (req, res)=>{
  const error = req.session.error
  const message = req.session.message
  delete req.session.error
  delete req.session.message
  res.render("sign-in", {
    error, 
    csrfToken: req.csrfToken(), 
    message
  })
}

const login = async (req, res)=>{
  const {name, email, password} = req.body
  // Check if this is a valid user
  try{
    // Sanitization of inputs 
    if (!isEmail(email)){
      throw new Error("Invalid email")
    } else if (!isLength(password, {min:1})){
      throw new Error("Password is required")
    } 

    const newUser = new User(name, email, password)
    const user = await User.findByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
      throw new Error("Email or Password is incorrect")
    }
    // Add user id onto session 
    req.session.userId = user._id
  }catch(e){
    console.log(e.message)
    req.session.error = "Wrong Email or Password"
    return res.status(401).redirect("/users/login")
  }
  res.redirect("/")
}

const profilePage = async(req, res)=>{
  let posts 
  const user = res.locals.user
  const error = req.session.error
  const message = req.session.message
  const userId = req.session.userId
  try{
    // GEt the user 
    // user = await User.findById(req.session.userId)
    console.log("User", user)
    // Get posts for this user 
    console.log(req.session)
    // posts = await Post.fetchAll(req.session.userId)
    posts = await Post.findAllByUser(req.session.userId, 5, 0)
    console.log(posts)
    posts.forEach((post)=>{
      post.lastModified = moment(post._id.getTimestamp()).fromNow()
    })

  }catch(e){
    console.log(e.message)
    console.log("Posts")
    req.session.error = "Unable to get User"
    return res.redirect("/")
  }
  console.log("User", user)
  res.render("profile", {
    posts: posts,
    loggedIn: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
    error,
    message, 
    userId, 
    user
  })
}


const logout = async(req, res)=>{
  req.session.destroy((err)=>{
    if(err){
      console.log(err)
      req.session.error = "Unable to Logout"
      return res.redirect("/")
    }
    res.redirect("/")
  })
}

const deleteProfile = async(req, res)=>{
  console.log(res.locals.user)
  try{
    await User.deleteBydId(res.locals.user._id)
    req.session.message = "Deleted User"
  }catch(e){
    req.session.error = "Unable to Delete User"
    console.log(e.message)
  }
  res.redirect("/users/logout")
}

module.exports = {
  signupPage,
  signup, 
  loginPage,
  login, 
  profilePage, 
  logout, 
  deleteProfile
}