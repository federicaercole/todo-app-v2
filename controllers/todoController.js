const sql = require('../models/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');

async function createTodo(title, due_date, priority, category) {
    const [result] = await sql.query(`INSERT INTO todos (title, due_date, priority, category) VALUES (?, ?, ?, ?)`, [title, due_date, priority, category]);
    return result;
}

async function todoNewGet(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    res.render('new-todo', { title: "New todo", categories });
}

async function todoNewPost(req, res) {
    const { title, due_date, priority, category } = req.body
    await createTodo(title, due_date, priority, category);
    res.redirect('/');
}

module.exports = { todoNewGet, todoNewPost };