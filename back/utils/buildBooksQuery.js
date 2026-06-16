const { sql } = require("../db");

module.exports = (filters, request) => {

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

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 12;
  const offset = (page - 1) * limit;

  let fromWhere = `
    FROM books b
    LEFT JOIN subcategories sc ON b.subcategoryId = sc.id
    LEFT JOIN categories c ON sc.categoryId = c.id
    LEFT JOIN book_genres bg ON b.id = bg.bookId
    LEFT JOIN genres g ON bg.genreId = g.id
    WHERE 1=1
  `;

  if (filters.search) {
    fromWhere += " AND (b.title LIKE @search OR b.author LIKE @search)";
    request.input("search", sql.NVarChar, `%${filters.search}%`);
  }

  if (subcategoryId) {
    fromWhere += " AND b.subcategoryId = @subcategoryId";
    request.input("subcategoryId", subcategoryId);
  }

  if (age) {
    const arr = Array.isArray(age) ? age : [age];

    fromWhere += ` AND b.ageRestrictions IN (${arr
      .map((_, i) => `@age${i}`)
      .join(",")})`;

    arr.forEach((a, i) => request.input(`age${i}`, a));
  }

  if (cover) {
    const arr = Array.isArray(cover) ? cover : [cover];

    fromWhere += ` AND b.cover IN (${arr
      .map((_, i) => `@cover${i}`)
      .join(",")})`;

    arr.forEach((c, i) => request.input(`cover${i}`, c));
  }

  if (publishingHouse) {
    const arr = Array.isArray(publishingHouse)
      ? publishingHouse
      : [publishingHouse];

    fromWhere += ` AND b.publishingHouse IN (${arr
      .map((_, i) => `@publ${i}`)
      .join(",")})`;

    arr.forEach((p, i) => request.input(`publ${i}`, p));
  }

  if (genres) {
    const arr = Array.isArray(genres) ? genres : [genres];

    fromWhere += `
      AND b.id IN (
        SELECT bg.bookId
        FROM book_genres bg
        WHERE bg.genreId IN (${arr
          .map((_, i) => `@genre${i}`)
          .join(",")})
      )
    `;

    arr.forEach((g, i) => request.input(`genre${i}`, g));
  }

  if (minPrice) {
    fromWhere +=
      " AND b.price * (1 - ISNULL(b.discount,0)) >= @minPrice";
    request.input("minPrice", minPrice);
  }

  if (maxPrice) {
    fromWhere +=
      " AND b.price * (1 - ISNULL(b.discount,0)) <= @maxPrice";
    request.input("maxPrice", maxPrice);
  }

  if (minRating) {
    fromWhere += " AND b.rating >= @minRating";
    request.input("minRating", sql.Decimal(2,1), Number(minRating));
  }

  if (hasDiscount) {
    fromWhere += " AND b.discount > 0";
  }

  if (yearOfPublication) {
    fromWhere += " AND b.yearOfPublication >= @yearOfPublication";
    request.input("yearOfPublication", yearOfPublication);
  }

  let orderBy = " ORDER BY b.id DESC";

  if (sort === "new")
    orderBy = " ORDER BY b.yearOfPublication DESC";

  else if (sort === "rating")
    orderBy = " ORDER BY b.rating DESC";

  else if (sort === "priceAsc")
    orderBy = " ORDER BY b.price ASC";

  else if (sort === "priceDesc")
    orderBy = " ORDER BY b.price DESC";

  request.input("offset", sql.Int, offset);
  request.input("limit", sql.Int, limit);

  const dataQuery = `
    SELECT DISTINCT
      b.*,
      sc.name AS subcategoryName,
      c.name AS categoryName

    ${fromWhere}

    ${orderBy}

    OFFSET @offset ROWS
    FETCH NEXT @limit ROWS ONLY
  `;

  const countQuery = `
    SELECT COUNT(DISTINCT b.id) AS total

    ${fromWhere}
  `;

  return {
    dataQuery,
    countQuery
  };
};