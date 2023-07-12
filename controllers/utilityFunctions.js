const sql = require('../models/dbConfig');

async function getAllCategories() {
    const [rows] = await sql.query("SELECT * FROM categories ORDER BY name ASC");
    return rows;
}

async function getTodoDates(sort) {
    let sortQuery = `SELECT DISTINCT due_date FROM todos`;
    sort === "asc" ? sortQuery += " ORDER BY due_date ASC" : sortQuery += " ORDER BY due_date DESC"
    const [rows] = await sql.query(sortQuery);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getAllTodos(sort) {
    let sortQuery = `SELECT todo_id, title, due_date, priority, done, name AS category
    FROM todos JOIN categories ON todos.category = categories.cat_id`;
    sort === "asc" ? sortQuery += " ORDER BY due_date ASC" : sortQuery += " ORDER BY due_date DESC"
    const [rows] = await sql.query(sortQuery);
    return rows;
}

function showMessage(req, res, next) {
    res.locals.message = req.flash();
    next();
}

module.exports = { getAllCategories, getAllTodos, getTodoDates, showMessage };