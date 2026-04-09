const express = require("express");
const { createNewAccount, authenticateMember } = require("../controllers/authController");
const router = express.Router();

// Signup ko badal kar wapas register kar dein
router.post("/register", createNewAccount); 

// Signin ko badal kar wapas login kar dein
router.post("/login", authenticateMember); 

module.exports = router;