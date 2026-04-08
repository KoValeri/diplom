const { sql, pool, poolConnect } = require("../db");

exports.getBooks = async (req, res) => {
  try {
    await poolConnect;

    const { search } = req.query;

    let query = `
      SELECT 
        b.*,
        sc.name AS subcategoryName,
        c.name AS categoryName
      FROM books b
      LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
      LEFT JOIN categories c ON sc.categoryId = c.id
    `;

    if (search) {
      query += `
        WHERE b.title LIKE '%' + @search + '%'
        OR b.author LIKE '%' + @search + '%'
      `;
    }

    const request = pool.request();

    if (search) {
      request.input("search", sql.NVarChar, search);
    }

    const result = await request.query(query);

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
      genres: [...new Map(
        bookRows
          .filter(row => row.genreId !== null && row.genreName)
          .map(row => [row.genreId, { id: row.genreId, name: row.genreName }])
      ).values()],
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
      return res.json([]);
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



exports.getAges = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query(`SELECT DISTINCT ageRestrictions FROM books WHERE ageRestrictions IS NOT NULL`);
        res.json(result.recordset.map(r => r.ageRestrictions));
    } catch(err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
};

exports.getCovers = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query(`SELECT DISTINCT cover FROM books WHERE cover IS NOT NULL`);
        res.json(result.recordset.map(r => r.cover));
    } catch(err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
};

exports.getPublishingHouse = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query(`SELECT DISTINCT publishingHouse FROM books WHERE publishingHouse IS NOT NULL`);
        res.json(result.recordset.map(r => r.publishingHouse));
    } catch(err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
};

exports.getBooksFiltered = async (req, res) => {
  try {
    await poolConnect;

    const {
      subcategoryId,
      age,
      genres,
      cover,
      publishingHouse,
      minPrice,
      maxPrice
    } = req.query;

    let query = `
      SELECT DISTINCT
        b.*,
        sc.name AS subcategoryName,
        c.name AS categoryName
      FROM books b
      LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
      LEFT JOIN categories c ON sc.categoryId = c.id
      LEFT JOIN book_genres bg ON b.id = bg.bookId
      LEFT JOIN genres g ON bg.genreId = g.id
      WHERE 1=1
    `;

    const request = pool.request();

    const subcatInt = parseInt(subcategoryId, 10);
    if (!isNaN(subcatInt)) {
      query += " AND b.subcategoryId = @subcategoryId";
      request.input("subcategoryId", sql.Int, subcatInt);
    }

    if (age) {
      const ageArray = Array.isArray(age) 
        ? age 
        : [age];

      if (ageArray.length) {
        query += " AND b.ageRestrictions IN (" +
          ageArray.map((_, i) => `@age${i}`).join(",") + ")";

        ageArray.forEach((a, i) => 
          request.input(`age${i}`, sql.NVarChar, a)
        );
      }
    }    


    if (cover) {
      const coverArray = Array.isArray(cover) 
        ? cover 
        : [cover];

      if (coverArray.length) {
        query += " AND b.cover IN (" +
          coverArray.map((_, i) => `@cover${i}`).join(",") + ")";

        coverArray.forEach((c, i) => 
          request.input(`cover${i}`, sql.NVarChar, c)
        );
      }
    }

    if (publishingHouse) {
      const publArray = Array.isArray(publishingHouse) 
        ? publishingHouse 
        : [publishingHouse];

      if (publArray.length) {
        query += " AND b.publishingHouse IN (" +
          publArray.map((_, i) => `@publ${i}`).join(",") + ")";

        publArray.forEach((p, i) => 
          request.input(`publ${i}`, sql.NVarChar, p)
        );
      }
    }

    if (genres) {
      const genreArray = Array.isArray(genres) ? genres : [genres];

      if (genreArray.length) {
        query += " AND b.id IN (SELECT bg.bookId FROM book_genres bg WHERE bg.genreId IN (" +
                genreArray.map((_, i) => `@genre${i}`).join(",") + "))";

        genreArray.forEach((g, i) => request.input(`genre${i}`, sql.Int, g));
      }
    }

    if (minPrice) {
      query += " AND b.price >= @minPrice";
      request.input("minPrice", sql.Decimal(10, 2), minPrice);
    }
    if (maxPrice) {
      query += " AND b.price <= @maxPrice";
      request.input("maxPrice", sql.Decimal(10, 2), maxPrice);
    }

    const result = await request.query(query);
    res.json(result.recordset);

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};