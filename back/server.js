const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
require("dotenv").config();

const app = express();
const port = 5000; // порт для API

app.use(cors());
app.use(bodyParser.json());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Простой тестовый маршрут
app.get("/", (req, res) => {
  res.send("API работает!");
});

// Маршрут для получения всех книг
app.get("/books", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM books`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
