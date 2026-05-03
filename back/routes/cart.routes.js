const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../authMiddleware");

// toggle добавить/удалить
router.post("/toggle", authMiddleware, cartController.toggleCartItem);

// получить корзину
router.get("/", authMiddleware, cartController.getCart);

// + / -
router.post("/increase", authMiddleware, cartController.increaseQuantity);
router.post("/decrease", authMiddleware, cartController.decreaseQuantity);

router.delete("/clear", authMiddleware, cartController.clearCart);

router.post("/checkout", authMiddleware, cartController.createOrder);

module.exports = router;