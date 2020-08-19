const express = require("express")
const {isAuthenticated, isAuthorized} = require("../middleware/auth")

const router = express.Router()

// Controllers 
const postsController = require("../controllers/posts")


// CREATE //
// /posts/new. Render new form. 
router.get("/new", isAuthenticated, postsController.newPostForm)
// /posts
router.post("/", isAuthenticated, postsController.createPost)
// READ //
// /posts
router.get("/", postsController.viewPosts)
// UPDATE //
router.get("/:id/edit", isAuthenticated, isAuthorized, postsController.editPost)
// /posts/:id
router.patch("/:id", isAuthenticated, isAuthorized, postsController.updatePost)
// DELETE //
router.delete("/:id", isAuthenticated, isAuthorized, postsController.deletePost)


module.exports = router; 