const sql = require('../models/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');

async function createTodo(title, due_date, priority, category) {
    const [result] = await sql.query(`INSERT INTO todos (title, due_date, priority, category) VALUES (?, ?, ?, ?)`, [title, due_date, priority, category]);
    return result;
}

async function updateTodo(title, due_date, priority, category, id) {
    const [result] = await sql.query(`UPDATE todos SET title = ?, due_date = ?, priority = ?, category = ? WHERE todo_id = ?`, [title, due_date, priority, category, id]);
    return result;
}

async function todoNewGet(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    res.render('new-todo', { title: "New todo", categories });
}

async function todoNewPost(req, res) {
    const { title, due_date, priority, category } = req.body
    await createTodo(title, due_date, priority, category);
    await req.flash("success", "New todo created");
    res.redirect('/');
}

async function getSingleTodo(id) {
    const [result] = await sql.query("SELECT * FROM todos WHERE todo_id = ?", id);
    return result[0];
}

async function todoEditGet(req, res) {
    const id = req.params.id;
    const categories = await utilityFunctions.getAllCategories();
    const todo = await getSingleTodo(id);
    res.render('edit-todo', { title: "Edit todo", categories, todo })
}

async function todoEditPut(req, res) {
    const id = req.params.id;
    const { title, due_date, priority, category } = req.body;
    await updateTodo(title, due_date, priority, category, id);
    req.flash("success", "Todo edited");
    res.redirect(`/todo/${id}/edit`);
}

async function todoDelete(req, res) {
    const { id, url } = req.body;
    await sql.query("DELETE FROM todos WHERE todo_id = ?", id);
    await req.flash("success", "Todo deleted");
    await res.json({ redirect: url });
}

module.exports = { todoNewGet, todoNewPost, todoEditGet, todoEditPut, todoDelete };