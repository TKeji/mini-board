// For /users requests
const express = require("express")
const router = express.Router()

const usersController = require("../controllers/users")


// Sign Up Page 
router.get("/new", usersController.signupPage)
router.post("/new", usersController.signup)

// // Sign In 
router.get("/login", usersController.loginPage)
router.post("/login", usersController.login)

// Logout
router.get("/logout", usersController.logout)

// View Profile 
router.get("/:id", usersController.profilePage)




module.exports = router