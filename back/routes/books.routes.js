const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBookById);
router.get("/:id/series", booksController.getBooksBySeries);

module.exports = router;