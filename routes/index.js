const express = require('express');
const router = express.Router();
const sql = require('../models/dbConfig.js');

async function getAllCategories() {
  const [rows] = await sql.query("SELECT * FROM categories");
  return rows;
}

async function getAllTodos() {
  const [rows] = await sql.query("SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id");
  return rows;
}

//Home page
router.get('/', async function (req, res) {
  const categories = await getAllCategories();
  const todos = await getAllTodos();
  res.render('index', { title: "All todos", categories: categories, todos: todos });
});

module.exports = router;
