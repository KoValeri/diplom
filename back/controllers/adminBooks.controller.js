const { sql, pool, poolConnect } = require("../db");

exports.createBook = async (req, res) => {
  try {
    await poolConnect;

    const {
      title,
      author,
      series,
      subcategoryId,
      cover,
      ageRestrictions,
      publishingHouse,
      price,
      yearOfPublication,
      pages,
      rating,
      description,
      imageUrl,
      discount,
      genres = []
    } = req.body;

    const request = pool.request();

    request.input("title", sql.NVarChar, title);
    request.input("author", sql.NVarChar, author);
    request.input("series", sql.NVarChar, series);
    request.input("subcategoryId", sql.Int, subcategoryId || null);
    request.input("cover", sql.NVarChar, cover);
    request.input("ageRestrictions", sql.NVarChar, ageRestrictions);
    request.input("publishingHouse", sql.NVarChar, publishingHouse);
    request.input("price", sql.Decimal(10, 2), Number(price));
    request.input("yearOfPublication", sql.Int, yearOfPublication);
    request.input("pages", sql.Int, pages);
    request.input("rating", sql.Float, rating);
    request.input("description", sql.NVarChar, description);
    request.input("imageUrl", sql.NVarChar, imageUrl);
    request.input("discount", sql.Decimal(3, 2), Number(discount) || 0);

    const result = await request.query(`
      INSERT INTO books (
        title, author, series, subcategoryId, cover,
        ageRestrictions, publishingHouse,
        price, yearOfPublication,
        pages, rating, description, imageUrl, discount
      )
      OUTPUT INSERTED.id
      VALUES (
        @title, @author, @series, @subcategoryId, @cover,
        @ageRestrictions, @publishingHouse,
        @price, @yearOfPublication,
        @pages, @rating, @description, @imageUrl, @discount
      )
    `);

    const bookId = result.recordset[0].id;

    for (let genreId of genres.map(Number)) {
      await pool.request()
        .input("bookId", sql.Int, bookId)
        .input("genreId", sql.Int, genreId)
        .query(`
          INSERT INTO book_genres (bookId, genreId)
          VALUES (@bookId, @genreId)
        `);
    }

    res.json({ id: bookId });

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка создания книги");
  }
}

exports.updateBook = async (req, res) => {
  try {
    await poolConnect;

    const { id } = req.params;

    const {
      title,
      author,
      series,
      subcategoryId,
      cover,
      ageRestrictions,
      publishingHouse,
      price,
      yearOfPublication,
      pages,
      rating,
      description,
      imageUrl,
      discount,
      genres = []
    } = req.body;

    const safeNumber = (v) => {
      const n = Number(v);
      return isNaN(n) ? null : n;
    };

    const safeGenres = Array.isArray(genres)
      ? genres.map(Number).filter(Boolean)
      : [];

    const check = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT id FROM books WHERE id = @id");

    if (!check.recordset.length) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }

    const request = pool.request();

    request.input("id", sql.Int, id);
    request.input("title", sql.NVarChar, title || null);
    request.input("author", sql.NVarChar, author || null);
    request.input("series", sql.NVarChar, series || null);
    request.input("subcategoryId", sql.Int, safeNumber(subcategoryId));
    request.input("cover", sql.NVarChar, cover || null);
    request.input("ageRestrictions", sql.NVarChar, ageRestrictions || null);
    request.input("publishingHouse", sql.NVarChar, publishingHouse || null);
    request.input("price", sql.Decimal(10, 2), safeNumber(price));
    request.input("yearOfPublication", sql.Int, safeNumber(yearOfPublication));
    request.input("pages", sql.Int, safeNumber(pages));
    request.input("rating", sql.Float, safeNumber(rating));
    request.input("description", sql.NVarChar, description || null);
    request.input("imageUrl", sql.NVarChar, imageUrl || null);
    request.input("discount", sql.Decimal(3, 2), safeNumber(discount));

    await request.query(`
      UPDATE books
      SET
        title = @title,
        author = @author,
        series = @series,
        subcategoryId = @subcategoryId,
        cover = @cover,
        ageRestrictions = @ageRestrictions,
        publishingHouse = @publishingHouse,
        price = @price,
        yearOfPublication = @yearOfPublication,
        pages = @pages,
        rating = @rating,
        description = @description,
        imageUrl = @imageUrl,
        discount = @discount
      WHERE id = @id
    `);

    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM book_genres WHERE bookId = @id");

    for (let genreId of safeGenres) {
      await pool.request()
        .input("bookId", sql.Int, id)
        .input("genreId", sql.Int, genreId)
        .query(`
          INSERT INTO book_genres (bookId, genreId)
          VALUES (@bookId, @genreId)
        `);
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка обновления книги"
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await poolConnect;

    const { id } = req.params;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM books
        OUTPUT DELETED.id
        WHERE id = @id
      `);

    if (!result.recordset.length) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка удаления книги"
    });
  }
};