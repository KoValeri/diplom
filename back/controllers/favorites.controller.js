const { pool, poolConnect } = require("../db");

// Добавить книгу в избранное
exports.toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await poolConnect;

    // Проверяем есть ли уже
    const check = await pool
      .request()
      .input("userId", userId)
      .input("bookId", bookId)
      .query(`
        SELECT * FROM favorites
        WHERE userId = @userId AND bookId = @bookId
      `);

    if (check.recordset.length > 0) {
      // УДАЛЯЕМ
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          DELETE FROM favorites
          WHERE userId = @userId AND bookId = @bookId
        `);

      return res.json({ isFavorite: false });
    } else {
      // ДОБАВЛЯЕМ
      await pool
        .request()
        .input("userId", userId)
        .input("bookId", bookId)
        .query(`
          INSERT INTO favorites (userId, bookId)
          VALUES (@userId, @bookId)
        `);

      return res.json({ isFavorite: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    await poolConnect;

    const result = await pool
      .request()
      .input("userId", userId)
      .query(`
        SELECT b.*
        FROM favorites f
        JOIN books b ON b.id = f.bookId
        WHERE f.userId = @userId
        ORDER BY f.createdAt DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};