const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controller");

router.post("/", reviewsController.createReview);
router.get("/:bookId", reviewsController.getReviewsByBook);
router.delete("/:id", reviewsController.deleteReview);

module.exports = router;