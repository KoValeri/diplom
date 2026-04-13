const { sql } = require("../db");

module.exports = (filters, request) => {
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

  const {
    subcategoryId,
    age,
    genres,
    cover,
    publishingHouse,
    minPrice,
    maxPrice,
    sort,
    minRating,
    hasDiscount,
    yearOfPublication,
  } = filters;

  if (filters.search) {
    query += " AND (b.title LIKE @search OR b.author LIKE @search)";
    request.input("search", sql.NVarChar, `%${filters.search}%`);
  }

  if (subcategoryId) {
    query += " AND b.subcategoryId = @subcategoryId";
    request.input("subcategoryId", subcategoryId);
  }

  if (age) {
    const arr = Array.isArray(age) ? age : [age];
    query += ` AND b.ageRestrictions IN (${arr.map((_, i) => `@age${i}`).join(",")})`;
    arr.forEach((a, i) => request.input(`age${i}`, a));
  }

  if (cover) {
    const arr = Array.isArray(cover) ? cover : [cover];
    query += ` AND b.cover IN (${arr.map((_, i) => `@cover${i}`).join(",")})`;
    arr.forEach((c, i) => request.input(`cover${i}`, c));
  }

  if (publishingHouse) {
    const arr = Array.isArray(publishingHouse) ? publishingHouse : [publishingHouse];
    query += ` AND b.publishingHouse IN (${arr.map((_, i) => `@publ${i}`).join(",")})`;
    arr.forEach((p, i) => request.input(`publ${i}`, p));
  }

  if (genres) {
    const arr = Array.isArray(genres) ? genres : [genres];
    query += ` AND b.id IN (
      SELECT bg.bookId FROM book_genres bg 
      WHERE bg.genreId IN (${arr.map((_, i) => `@genre${i}`).join(",")})
    )`;
    arr.forEach((g, i) => request.input(`genre${i}`, g));
  }

  if (minPrice) {
    query += " AND b.price * (1 - ISNULL(b.discount, 0)) >= @minPrice";
    request.input("minPrice", minPrice);
  }

  if (maxPrice) {
    query += " AND b.price * (1 - ISNULL(b.discount, 0)) <= @maxPrice";
    request.input("maxPrice", maxPrice);
  }

  if (minRating) {
    query += " AND b.rating >= @minRating";
    request.input("minRating", sql.Decimal(2,1), Number(minRating));
  }

  if (hasDiscount) {
    query += " AND b.discount > 0";
  }

  if (yearOfPublication) {
    query += " AND b.yearOfPublication >= @yearOfPublication";
    request.input("yearOfPublication", yearOfPublication);
  }

  if (sort === "new") query += " ORDER BY b.yearOfPublication DESC";
  else if (sort === "rating") query += " ORDER BY b.rating DESC";
  else if (sort === "priceAsc") query += " ORDER BY b.price ASC";
  else if (sort === "priceDesc") query += " ORDER BY b.price DESC";

  return query;
};