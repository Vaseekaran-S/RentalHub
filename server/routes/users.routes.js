const router = require("express").Router();
const { getUser, getAllUser, updateUser, deleteUser, createNewUser, verifyUser, tokenValidation } = require("../controller/users.controller");

router.get("/", getAllUser);  // Get all users

router.post("/signup", createNewUser)  // Create new user at SignUp
router.post("/login", verifyUser)  // Verify user at login
router.get("/token", tokenValidation)  // Validate the user token

router.get("/:id", getUser);  // Get a specific user
router.put("/:id", updateUser);  // Update a specific user
router.delete("/:id", deleteUser);  // Delete a specific user

module.exports = router;