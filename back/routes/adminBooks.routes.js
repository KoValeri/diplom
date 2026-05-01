const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminBooks.controller");

router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);

module.exports = router;