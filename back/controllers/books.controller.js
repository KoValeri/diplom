const { sql, pool, poolConnect } = require("../db");

exports.getBooks = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        b.*,
        sc.name AS subcategoryName,
        c.name AS categoryName
      FROM books b
      LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
      LEFT JOIN categories c ON sc.categoryId = c.id
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getBookById = async (req, res) => {
  try {
    await poolConnect;
    const { id } = req.params;

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT 
          b.*,
          g.id AS genreId,
          g.name AS genreName,
          sc.name AS subcategoryName,
          c.name AS categoryName,
          bai.id AS imageId,
          bai.imageUrl AS additionalImageUrl
        FROM books b
        LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
        LEFT JOIN categories c ON sc.categoryId = c.id
        LEFT JOIN book_genres bg ON b.id = bg.bookId
        LEFT JOIN genres g ON bg.genreId = g.id
        LEFT JOIN book_additional_images bai ON b.id = bai.bookId
        WHERE b.id = @id
      `);

    const bookRows = result.recordset;

    if (bookRows.length === 0) {
      return res.status(404).send("Книга не найдена");
    }

    // Формируем объект книги с массивом жанров и доп фото
    const book = {
      ...bookRows[0],
      genres: bookRows
        .filter(row => row.genreId !== null && row.genreName)
        .map(row => ({ id: row.genreId, name: row.genreName })),
      additionalImages: [...new Map(
        bookRows
          .filter(row => row.imageId && row.additionalImageUrl)
          .map(row => [row.imageId, { id: row.imageId, url: row.additionalImageUrl }])
      ).values()]
    };

    res.json(book);

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getBooksBySeries = async (req, res) => {
  try {
    await poolConnect;
    const { id } = req.params;

    // 1. Получаем серию книги
    const bookResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT series
        FROM books
        WHERE id = @id
      `);

    const series = bookResult.recordset[0]?.series;

    if (!series) {
      return res.json([]); // нет серии → нет рекомендаций
    }

    // 2. Получаем книги той же серии
    const result = await pool
      .request()
      .input("series", sql.NVarChar, series)
      .input("id", sql.Int, id)
      .query(`
        SELECT *
        FROM books
        WHERE series = @series
      `);

    res.json(result.recordset);

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};