// For /users requests
const express = require("express")
const router = express.Router()
const {isAuthenticated} = require("../middleware/auth")

const usersController = require("../controllers/users")


// Sign Up Page 
router.get("/new", usersController.signupPage)
router.post("/new", usersController.signup)

// // Sign In 
router.get("/login", usersController.loginPage)
router.post("/login", usersController.login)

// Logout
router.get("/logout", isAuthenticated, usersController.logout)

// View Profile 
router.get("/:id", isAuthenticated, usersController.profilePage)
router.delete("/:id", isAuthenticated, usersController.deleteProfile)



module.exports = router