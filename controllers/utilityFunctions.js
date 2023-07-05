const sql = require('../models/dbConfig');

async function getAllCategories() {
    const [rows] = await sql.query("SELECT * FROM categories");
    return rows;
}

async function getAllTodos() {
    const [rows] = await sql.query("SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id");
    return rows;
}

module.exports = { getAllCategories, getAllTodos };