require("dotenv").config();
const sql = require("mssql");
const fs = require("fs");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function importBooks() {
  try {
    const books = JSON.parse(fs.readFileSync("./books.json", "utf8"));
    await sql.connect(config);

    for (const book of books) {
      const subcategoryId = book.subcategory || null;

      // Проверяем наличие subcategory
      if (!subcategoryId) {
        console.warn(`Книга "${book.title}" не имеет subcategory!`);
      }

      // Проверяем, есть ли книга в базе
      const existing = await sql.query`
        SELECT id FROM books WHERE title = ${book.title}
      `;

      let bookId;

      if (existing.recordset.length === 0) {
        // Вставляем новую книгу
        const insertBook = await sql.query`
          INSERT INTO books 
            (title, author, description, price, publishingHouse, yearOfPublication, pages, cover, ageRestrictions, imageUrl, rating, series, subcategoryId)
          VALUES 
            (${book.title}, ${book.author}, ${book.description}, ${book.price}, ${book.publishingHouse}, ${book.yearOfPublication}, ${book.pages}, ${book.cover}, ${book.ageRestrictions}, ${book.imageUrl}, ${book.rating}, ${book.series}, ${subcategoryId});
          SELECT SCOPE_IDENTITY() AS id;
        `;
        bookId = insertBook.recordset[0].id;
      } else {
        // Обновляем существующую книгу
        bookId = existing.recordset[0].id;
        await sql.query`
          UPDATE books
          SET
            author=${book.author},
            description=${book.description},
            price=${book.price},
            publishingHouse=${book.publishingHouse},
            yearOfPublication=${book.yearOfPublication},
            pages=${book.pages},
            cover=${book.cover},
            ageRestrictions=${book.ageRestrictions},
            imageUrl=${book.imageUrl},
            rating=${book.rating},
            series=${book.series},
            subcategoryId=${subcategoryId}
          WHERE id=${bookId};
        `;
      }

      // Обрабатываем жанры
      const genres = Array.isArray(book.genre) ? book.genre : [];
      if (genres.length === 0) {
        console.warn(`Книга "${book.title}" не имеет жанров!`);
      }

      for (const genreId of genres) {
        await sql.query`
          IF NOT EXISTS (SELECT * FROM book_genres WHERE bookId=${bookId} AND genreId=${genreId})
            INSERT INTO book_genres (bookId, genreId) VALUES (${bookId}, ${genreId});
        `;
      }
    }

    console.log("Книги успешно импортированы!");
  } catch (err) {
    console.error("Ошибка импорта:", err);
  } finally {
    sql.close();
  }
}

importBooks();