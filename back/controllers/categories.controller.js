const { sql, pool, poolConnect } = require("../db");

exports.getCategories = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        c.id AS categoryId,
        c.name AS categoryName,
        c.poster AS categoryPoster,
        sc.id AS subcategoryId,
        sc.name AS subcategoryName
      FROM categories c
      LEFT JOIN subcategories sc ON sc.categoryId = c.id
      ORDER BY c.id, sc.id
    `);

    const rows = result.recordset;

    const categoriesMap = new Map();

    rows.forEach(row => {
      if (!categoriesMap.has(row.categoryId)) {
        categoriesMap.set(row.categoryId, {
          id: row.categoryId,
          name: row.categoryName,
          poster: row.categoryPoster,
          subcategories: []
        });
      }

      if (row.subcategoryId) {
        categoriesMap.get(row.categoryId).subcategories.push({
          id: row.subcategoryId,
          name: row.subcategoryName
        });
      }
    });

    const categories = Array.from(categoriesMap.values());

    res.json(categories);

  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};