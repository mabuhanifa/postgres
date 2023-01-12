const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const user ={
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: 5432,
  database: process.env.database,
};

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM employee");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});


app.listen(port, () => {
  console.log(`App listening on ${port}`, user);
});
