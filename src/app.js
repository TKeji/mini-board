const path = require("path")
const express = require("express")
const postsRouter = require("./routes/posts")
const errorController = require("./controllers/error")

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

// Routes
app.use("/posts", postsRouter) // Post routes

// 404 Pages
app.use("*", errorController.show404)

app.listen(3000, ()=>{
  console.log("The server is running...")
})