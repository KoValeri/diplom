const { sql, pool, poolConnect } = require("../db");

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

// Получить все лучшие книги (для страницы бестселлеров)
exports.getAllBestsellers = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .query("SELECT * FROM books WHERE rating >= 4.8 ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};