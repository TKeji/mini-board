const path = require("path")
const express = require("express")
const methodOverride = require("method-override")
const postsRouter = require("./routes/posts")
const errorController = require("./controllers/error")
const {mongoConnect} = require("./utils/database")

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

// Routes
app.get("/", (req, res)=> res.redirect("/posts"))
app.use("/posts", postsRouter) // Post routes
// 404 Pages
app.use(errorController.show404)


const main = async()=>{
  await mongoConnect(()=>{
    app.listen(process.env.PORT, ()=>{
      console.log("The server is running...")
    })
  })
}

main()
