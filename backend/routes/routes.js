//create route instance
const express = require("express");
const router = express.Router();

//import controllers 
const { registerUser } = require("../controllers/registerUser.js");
const { verifyEmail } = require("../controllers/verifyEmail.js");
const { verifyPassword } = require("../controllers/verifyPassword");
const { userDetails } = require("../controllers/userDetails.js");
const { logOut } = require("../controllers/logout.js")
const { updateUserDetails } = require("../controllers/updateUserDetails.js")

//define routes
router.post("/signUp", registerUser);
router.post("/verifyEmail", verifyEmail);
router.post("/verifyPwd", verifyPassword);
router.get("/userDetails", userDetails);
router.get("/logout", logOut);
router.post("/updateUserDetails", updateUserDetails);

//export routes
module.exports = router;
