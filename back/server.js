const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const booksRoutes = require("./routes/books.routes");
const usersRoutes = require("./routes/users.routes");
const newBooksRoutes = require("./routes/newBooks.routes");
const bestsellersRoutes = require("./routes/bestsellers.routes");
const discountsRoutes = require("./routes/discounts.routes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API работает!");
});

app.use("/books", booksRoutes);
app.use("/users", usersRoutes);
app.use("/new-books", newBooksRoutes);
app.use("/bestsellers", bestsellersRoutes);
app.use("/discounts", discountsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});