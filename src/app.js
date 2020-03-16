const path = require("path")
const express = require("express")
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

// Routes
app.use("/posts", postsRouter) // Post routes
app.use("/", (req, res)=>{res.redirect("/posts")})
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

// const moment = require("moment")
// const myDate = Date.now()
// console.log(myDate)
// console.log(moment(myDate).isoWeekday())