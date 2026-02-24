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
      await sql.query`
        INSERT INTO books (title, author, description, price, genre, publishingHouse, yearOfPublication, pages, cover, ageRestrictions, imageUrl, categoryId)
        VALUES (${book.title}, ${book.author}, ${book.description}, ${book.price}, ${book.genre}, ${book.publishingHouse}, ${book.yearOfPublication}, ${book.pages}, ${book.cover}, ${book.ageRestrictions}, ${book.imageUrl}, ${book.categoryId})`;
    }

    console.log("Книги успешно импортированы!");
  } catch (err) {
    console.error("Ошибка импорта:", err);
  } finally {
    sql.close();
  }
}

importBooks();
