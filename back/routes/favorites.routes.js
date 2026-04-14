const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites.controller")
const authMiddleware = require("../authMiddleware");

router.post(
  "/toggle",
  authMiddleware,
  favoritesController.toggleFavorite
);

router.get(
  "/",
  authMiddleware,
  favoritesController.getFavorites
);

module.exports = router;