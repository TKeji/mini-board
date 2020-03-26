const path = require("path")
const express = require("express")
const methodOverride = require("method-override")
const session = require("express-session")
const mongoDBStore = require('connect-mongodb-session')(session);

const postsRouter = require("./routes/posts")
const usersRouter = require("./routes/users")
const errorController = require("./controllers/error")
const {mongoConnect} = require("./utils/database")
const User = require("./models/user")

// Constants 
const TEN_MINS = 1000*60*10
const SESS_AGE = TEN_MINS

const app = express()

// Useful paths 
const publicDir = path.join(__dirname, "..", "/public")

// Set up express 
app.set("view engine", "pug")
app.set("views", "views")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(publicDir))
app.use(methodOverride("_method"))
//  Set up session
app.use(session({
  name: "sid",
  resave: false, 
  saveUninitialized: false,
  secret: process.env.SESS_SECRET, 
  store: new mongoDBStore({
    uri: process.env.MONGODB_SESS_URI,
    collection: "sessions"
  }),
  cookie: {
    maxAge: SESS_AGE, 
    sameSite: true
  }
}))

// Set up user onto every req 
app.use(async(req, res, next)=>{
  console.log("New request------")
  console.log(req.session.userId)
  req.session.isLoggedIn = false
  if (req.session.userId){
    res.locals.user = await User.findById(req.session.userId)
    req.session.isLoggedIn = true
  }
  next()
})

// Routes
app.get("/", (req, res)=> res.redirect("/posts"))
app.use("/posts", postsRouter) // Post routes
app.use("/users", usersRouter)
// 404 Pages
app.use(errorController.show404)


const main = async()=>{
  await mongoConnect(async()=>{
    try{
      await require("./models/user").initialise()
    } catch(e){
      console.log("Error", e.message)
    }
    app.listen(process.env.PORT, ()=>{
      console.log("The server is running...")
    })
  })
}

main()
