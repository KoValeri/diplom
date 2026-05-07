const { sql, pool, poolConnect } = require("../db");

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