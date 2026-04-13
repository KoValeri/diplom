const { sql, pool, poolConnect } = require("../db");

// Получить первые 5 для акций (для главной страницы)
exports.getDiscounts = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .query("SELECT TOP 5 * FROM books WHERE discount > 0 ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};
