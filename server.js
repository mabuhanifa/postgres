const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// get all todos
app.get("/book", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM bookdb");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});

// get a book by id
app.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM bookdb WHERE id=$1", [id]);
    res.status(201).json({
      message: `success`,
      data: book.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

// delete a book by id
app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bookdb WHERE id=$1", [id]);
    res.status(201).json({
      message: `successfully deleted book ${id}`,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

// create a book
app.post("/book", async (req, res) => {
  try {
    const { name, price, info, img } = req.body;
    const newBook = await pool.query(
      "INSERT INTO bookdb (name, price, info, img) VALUES($1, $2, $3, $4) RETURNING *",
      [name, price, info, img]
    );

    res.status(201).json({
      message: `book was created successfully ${name}`,
      data: newBook.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

// update a book by id
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, info } = req.body;
    const updatedBook = await pool.query(
      "UPDATE book SET name=$1, price=$2 info=$3 WHERE id=$4 RETURNING *",
      [name, price, info, id]
    );

    res.status(201).json({
      message: `book was updated successfully ${id} ,${name}, ${info}`,
      data: updatedBook.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
