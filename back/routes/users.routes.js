const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../authMiddleware");

router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
router.get("/me", authMiddleware, usersController.getMe);

module.exports = router;