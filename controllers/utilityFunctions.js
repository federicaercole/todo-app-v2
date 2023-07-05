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

async function getSingleTodo(id) {
    const [result] = await sql.query("SELECT done FROM todos WHERE todo_id = ?", id);
    return result;
}

async function getAllTodos() {
    const [rows] = await sql.query("SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id ORDER BY due_date DESC");
    return rows;
}

async function getTodoStatus(todo_id) {
    const [result] = await sql.query("SELECT done FROM todos WHERE todo_id = ? ", todo_id)
    return result;
}

module.exports = { getAllCategories, getAllTodos, getTodoStatus, getTodoDates };