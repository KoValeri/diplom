const express = require("express");
const router = express.Router();
const bestsellersController = require("../controllers/bestsellers.controller");

router.get("/", bestsellersController.getBestsellers);        // первые 5 лучших
router.get("/all", bestsellersController.getAllBestsellers);  // все лучшие

module.exports = router;