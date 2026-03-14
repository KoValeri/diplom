const express = require("express");
const router = express.Router();
const newBooksController = require("../controllers/newBooks.controller");

router.get("/", newBooksController.getNewBooks);        // первые 5 новинок
router.get("/all", newBooksController.getAllNewBooks);  // все новинки

module.exports = router;