const { sql, pool, poolConnect } = require("../db");

exports.createReview = async (req, res) => {
  try {
    await poolConnect;

    const { bookId, userId, comment } = req.body;

    await pool.request()
      .input("bookId", sql.Int, bookId)
      .input("userId", sql.Int, userId)
      .input("comment", sql.NVarChar, comment)
      .query(`
        INSERT INTO book_reviews  (bookId, userId, comment)
        VALUES (@bookId, @userId, @comment)
      `);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getReviewsByBook = async (req, res) => {
  try {
    await poolConnect;

    const { bookId } = req.params;

    const result = await pool.request()
      .input("bookId", sql.Int, bookId)
      .query(`
        SELECT 
          r.id,
          r.comment,
          r.createdAt,
          u.id AS userId,
          u.firstName,
          u.lastName
        FROM book_reviews  r
        JOIN users u ON r.userId = u.id
        WHERE r.bookId = @bookId
        ORDER BY r.id DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await poolConnect;

    const { id } = req.params;

    await pool.request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM book_reviews  WHERE id = @id`);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};