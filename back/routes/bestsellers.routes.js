const express = require("express");
const router = express.Router();
const bestsellersController = require("../controllers/bestsellers.controller");

router.get("/", bestsellersController.getBestsellers);

module.exports = router;