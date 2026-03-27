const express = require("express");
const router = express.Router();
const discountsController = require("../controllers/discounts.controller");

router.get("/", discountsController.getDiscounts);
router.get("/all", discountsController.getAllDiscounts);

module.exports = router;