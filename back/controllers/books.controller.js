const { sql, pool, poolConnect } = require("../db");
const buildQuery = require("../utils/buildBooksQuery");

exports.getBooks = async (req, res) => {
  try {
    await poolConnect;

    const { search } = req.query;

    let query = `
      SELECT 
        b.*,
        sc.id AS subcategoryId,
        sc.name AS subcategoryName,
        c.id AS categoryId,
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

    // 1. Основная книга (без JOIN мусора)
    const bookResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT *
        FROM books
        WHERE id = @id
      `);

    if (bookResult.recordset.length === 0) {
      return res.status(404).send("Книга не найдена");
    }

    const book = bookResult.recordset[0];

    // 2. Категория + подкатегория
    const categoryResult = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT 
          c.id AS categoryId,
          c.name AS categoryName,
          sc.id AS subcategoryId,
          sc.name AS subcategoryName
        FROM books b
        LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
        LEFT JOIN categories c ON sc.categoryId = c.id
        WHERE b.id = @id
      `);

    const categoryData = categoryResult.recordset[0] || {};

    // 3. Жанры
    const genresResult = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT g.id, g.name
        FROM book_genres bg
        JOIN genres g ON bg.genreId = g.id
        WHERE bg.bookId = @id
      `);

    // 4. Доп изображения
    const imagesResult = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT id, imageUrl
        FROM book_additional_images
        WHERE bookId = @id
      `);

    // 5. Собираем чистый объект
    const fullBook = {
      ...book,

      categoryId: categoryData.categoryId || null,
      subcategoryId: categoryData.subcategoryId || null,
      categoryName: categoryData.categoryName || null,
      subcategoryName: categoryData.subcategoryName || null,

      genres: genresResult.recordset.map(g => ({
        id: g.id,
        name: g.name
      })),

      additionalImages: imagesResult.recordset.map(img => ({
        id: img.id,
        url: img.imageUrl
      }))
    };

    res.json(fullBook);

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

    const request = pool.request();
    const query = buildQuery(req.query, request);

    const result = await request.query(query);
    res.json(result.recordset);

  } catch (err) {
    res.status(500).send("Ошибка сервера");
  }
};