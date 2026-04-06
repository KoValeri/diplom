const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

router.get("/", booksController.getBooks);
router.get("/subcategory/:subcategoryId", booksController.getBooksBySubcategory);
router.get("/:id/series", booksController.getBooksBySeries);
router.get("/:id", booksController.getBookById);

module.exports = router;