const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const booksRoutes = require("./routes/books.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API работает!");
});

app.use("/books", booksRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});