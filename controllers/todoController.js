const sql = require('../models/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');
const ash = require("express-async-handler");
const { body, validationResult } = require("express-validator");

async function createTodo(title, due_date, priority, category) {
    const [result] = await sql.query(`INSERT INTO todos (title, due_date, priority, category) VALUES (?, ?, ?, ?)`, [title, due_date, priority, category]);
    return result;
}

async function updateTodo(title, due_date, priority, category, id) {
    const [result] = await sql.query(`UPDATE todos SET title = ?, due_date = ?, priority = ?, category = ? WHERE todo_id = ?`, [title, due_date, priority, category, id]);
    return result;
}

async function getSingleTodo(id) {
    const [result] = await sql.query("SELECT * FROM todos WHERE todo_id = ?", id);
    return result[0];
}

const formValidation = [body("title", "Todo name must be between 1 and 40 characters").trim().isLength({ min: 1, max: 40 }).escape(),
body("due_date", "You must insert a valid due date").isISO8601().toDate(),
body("priority", "You must choose a priority level").notEmpty(),
body("category", "You must choose a category").notEmpty(),
]

const todoNewGet = ash(async (req, res) => {
    const categories = await utilityFunctions.getAllCategories();
    res.render('new-todo', { title: "New todo", categories });
});

const todoNewPost = [
    formValidation,
    ash(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("error", errors.array());
            res.redirect(`/todo/new`);
            return;
        } else {
            const { title, due_date, priority, category } = req.body;
            await createTodo(title, due_date, priority, category);
            req.flash("success", "New todo created");
            res.redirect('/');
        }
    })];

const todoEditGet = ash(async (req, res, next) => {
    const id = req.params.id;
    const todo = await getSingleTodo(id);
    if (!todo) {
        const err = new Error("Not found");
        err.status = 404;
        return next(err);
    }
    const categories = await utilityFunctions.getAllCategories();
    res.render('edit-todo', { title: "Edit todo", categories, todo })
});

const todoEditPut = [
    formValidation,
    ash(async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id;
        if (!errors.isEmpty()) {
            req.flash("error", errors.array());
            res.redirect(`/todo/${id}/edit`);
            return;
        } else {
            const { title, due_date, priority, category } = req.body;
            await updateTodo(title, due_date, priority, category, id);
            req.flash("success", "Todo edited");
            res.redirect(`/todo/${id}/edit`);
        }
    })];

const todoDelete = ash(async (req, res) => {
    const { id, url } = req.body;
    await sql.query("DELETE FROM todos WHERE todo_id = ?", id);
    req.flash("success", "Todo deleted");
    res.json({ redirect: url });
});

module.exports = { todoNewGet, todoNewPost, todoEditGet, todoEditPut, todoDelete };