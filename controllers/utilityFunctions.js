const sql = require('../models/dbConfig');

async function getAllCategories() {
    const [rows] = await sql.query("SELECT * FROM categories");
    return rows;
}

async function getTodoDates() {
    const [rows] = await sql.query("SELECT DISTINCT due_date FROM todos ORDER BY due_date DESC");
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getAllTodos() {
    const [rows] = await sql.query("SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id ORDER BY due_date DESC");
    return rows;
}

module.exports = { getAllCategories, getAllTodos, getTodoDates };