const { pool, poolConnect } = require("../db");

exports.toggleCartItem = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await poolConnect;

    const check = await pool
      .request()
      .input("userId", userId)
      .input("bookId", bookId)
      .query(`
        SELECT * FROM cart_items
        WHERE userId = @userId AND bookId = @bookId
      `);

    if (check.recordset.length > 0) {
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          DELETE FROM cart_items
          WHERE userId = @userId AND bookId = @bookId
        `);

      return res.json({ inCart: false });
    } else {
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          INSERT INTO cart_items (userId, bookId, quantity)
          VALUES (@userId, @bookId, 1)
        `);

      return res.json({ inCart: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await poolConnect;

    const result = await pool
      .request()
      .input("userId", userId)
      .query(`
        SELECT 
          ci.id,
          ci.bookId,
          ci.quantity,
          b.title,
          b.author,
          b.price,
          b.imageUrl,
          b.discount
        FROM cart_items ci
        JOIN books b ON b.id = ci.bookId
        WHERE ci.userId = @userId
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.increaseQuantity = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await poolConnect;

    await pool
      .request()
      .input("userId", userId)
      .input("bookId", bookId)
      .query(`
        UPDATE cart_items
        SET quantity = quantity + 1
        WHERE userId = @userId AND bookId = @bookId
      `);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.decreaseQuantity = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await poolConnect;

    const item = await pool
      .request()
      .input("userId", userId)
      .input("bookId", bookId)
      .query(`
        SELECT quantity FROM cart_items
        WHERE userId = @userId AND bookId = @bookId
      `);

    if (item.recordset.length === 0) {
      return res.json({ success: false });
    }

    if (item.recordset[0].quantity <= 1) {
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          DELETE FROM cart_items
          WHERE userId = @userId AND bookId = @bookId
        `);
    } else {
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          UPDATE cart_items
          SET quantity = quantity - 1
          WHERE userId = @userId AND bookId = @bookId
        `);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await poolConnect;

    await pool
      .request()
      .input("userId", userId)
      .query(`
        DELETE FROM cart_items
        WHERE userId = @userId
      `);

    res.json({ success: true, message: "Корзина очищена" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  const {
    fullName,
    email,
    phone,
    address,
    paymentMethod,
    deliveryMethod,
    items
  } = req.body;

  try {
    await poolConnect;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Не выбраны товары" });
    }

    const request = pool.request().input("userId", userId);

    const inParams = items.map((id, i) => {
      request.input(`id${i}`, id);
      return `@id${i}`;
    }).join(",");

    const cart = await request.query(`
      SELECT ci.bookId, ci.quantity, b.price, b.discount
      FROM cart_items ci
      JOIN books b ON b.id = ci.bookId
      WHERE ci.userId = @userId
      AND ci.bookId IN (${inParams})
    `);

    if (cart.recordset.length === 0) {
      return res.status(400).json({ message: "Корзина пуста" });
    }

    let totalPrice = 0;

    cart.recordset.forEach(item => {
      const discount = item.discount > 0 ? item.price * item.discount : 0;
      totalPrice += (item.price - discount) * item.quantity;
    });

    const deliveryPrice = deliveryMethod === "courier" ? 6 : 0;
    totalPrice += deliveryPrice;

    const orderResult = await pool.request()
      .input("userId", userId)
      .input("totalPrice", totalPrice)
      .input("fullName", fullName)
      .input("email", email)
      .input("phone", phone)
      .input("address", address)
      .input("paymentMethod", paymentMethod)
      .input("deliveryMethod", deliveryMethod)
      .input("deliveryPrice", deliveryPrice)
      .query(`
        INSERT INTO orders (
          userId, totalPrice,
          fullName, email, phone, address,
          paymentMethod, deliveryMethod, deliveryPrice
        )
        OUTPUT INSERTED.id
        VALUES (
          @userId, @totalPrice,
          @fullName, @email, @phone, @address,
          @paymentMethod, @deliveryMethod, @deliveryPrice
        )
      `);

    const orderId = orderResult.recordset[0].id;

    for (const item of cart.recordset) {
      await pool.request()
        .input("orderId", orderId)
        .input("bookId", item.bookId)
        .input("quantity", item.quantity)
        .input("price", item.price)
        .query(`
          INSERT INTO order_items (orderId, bookId, quantity, price)
          VALUES (@orderId, @bookId, @quantity, @price)
        `);
    }

    const deleteRequest = pool.request().input("userId", userId);

    items.forEach((id, i) => {
      deleteRequest.input(`id${i}`, id);
    });

    const deleteIn = items.map((_, i) => `@id${i}`).join(",");

    await deleteRequest.query(`
      DELETE FROM cart_items
      WHERE userId = @userId
      AND bookId IN (${deleteIn})
    `);

    try {
      const userData = await pool.request()
        .input("userId", userId)
        .query(`
          SELECT email, firstName
          FROM users
          WHERE id = @userId
        `);

      const user = userData.recordset[0];

      const orderItemsResult = await pool.request()
        .input("orderId", orderId)
        .query(`
          SELECT 
            oi.quantity,
            oi.price,
            b.title
          FROM order_items oi
          JOIN books b ON b.id = oi.bookId
          WHERE oi.orderId = @orderId
        `);

      const orderItems = orderItemsResult.recordset;

      const { sendOrderEmail } = require("../services/mailService");

      await sendOrderEmail(
        user.email,
        user.firstName,
        orderId,
        orderItems
      );

      } catch (err) {
        console.error("Ошибка отправки email:", err);
      }

        res.json({
          success: true,
          orderId
        });

      } catch (err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
      }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    await poolConnect;
    const result = await pool.request()
      .input("userId", userId)
      .query(`
        SELECT 
          o.*,
          (SELECT 
             oi.quantity, 
             oi.price, 
             b.title, 
             b.imageUrl
           FROM order_items oi
           JOIN books b ON b.id = oi.bookId
           WHERE oi.orderId = o.id
           FOR JSON PATH) AS itemsJson
        FROM orders o
        WHERE o.userId = @userId
        ORDER BY o.createdAt DESC
      `);

    const orders = result.recordset.map(order => ({
      ...order,
      items: order.itemsJson ? JSON.parse(order.itemsJson) : []
    }));

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера при получении заказов");
  }
};