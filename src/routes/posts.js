const path = require("path")
const express = require("express")

const router = express.Router()

// Controllers 
const postsController = require("../controllers/posts")


// CREATE //
// /posts/new. Render new form. 
router.get("/new", postsController.newPostForm)
// /posts
router.post("/", postsController.createPost)
// READ //
// /posts
router.get("/", postsController.viewPosts)
// READ SINGULAR POST
// /posts/:id
router.get("/:id", postsController.viewPost)
// UPDATE //
// /posts/:id
router.patch("/:id", postsController.updatePost)
// DELETE //
router.delete("/:id", postsController.deletePost)


module.exports = router; 