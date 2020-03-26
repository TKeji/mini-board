const User = require("../models/user")

// /users/new
const signupPage = async (req, res)=>{
  res.render("sign-up")
}

const signup = async (req, res)=>{
  const {name, email, password, imageURL} = req.body
  const newUser = new User(name, email, password,  imageURL)
  try{
    const user = await User.create(newUser)
    // Add user id to sessoin
    req.session.userId = user._id
  } catch(e){
    console.log(e.message)
    return res.redirect('/users/new')
  }
  res.status(201).redirect("/")
}

const loginPage = async (req, res)=>{
  res.render("sign-in")
}

const login = async (req, res)=>{
  const {name, email, password} = req.body
  const newUser = new User(name, email, password)
  console.log(newUser)
  // Check if this is a valid user
  try{
    const user = await User.findByEmail(email)
    if (user.password !== password){
      throw new Error("Email or Password is incorrect")
    }
    // Add user id onto session 
    req.session.userId = user._id
  }catch(e){
    console.log(e.message)
    res.status(401).redirect("/users/login")
  }
  res.redirect("/")
}

const profilePage = async(req, res)=>{
  res.send("PROFILE PAGE UNDER CONSTRUCTION")
}


const logout = async(req, res)=>{
  req.session.destroy((err)=>{
    if(err){
      console.log(err)
    }
    res.redirect("/")
  })
}

module.exports = {
  signupPage,
  signup, 
  loginPage,
  login, 
  profilePage, 
  logout
}