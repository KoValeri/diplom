const { sql, pool, poolConnect } = require("../db");

// Получить первые 5 новинок 2026 года (для главной страницы)
exports.getNewBooks = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .query("SELECT TOP 5 * FROM books WHERE yearOfPublication = 2026 ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

// Получить все новинки 2026 года (для страницы новинок)
exports.getAllNewBooks = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .query("SELECT * FROM books WHERE yearOfPublication = 2026 ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};