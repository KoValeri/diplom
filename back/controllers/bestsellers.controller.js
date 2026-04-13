const { sql, pool, poolConnect } = require("../db");
const buildQuery = require("../utils/buildBooksQuery");

// Получить первые 5 лучших книг (для главной страницы)
exports.getBestsellers = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .query("SELECT TOP 5 * FROM books WHERE rating >= 4.8 ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};