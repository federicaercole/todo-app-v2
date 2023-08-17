const sql = require('../config/dbConfig.js');
const ash = require("express-async-handler");
const { body } = require("express-validator");
const utilityFunctions = require("./utilityFunctions.js");

async function createTodo(title, due_date, priority, category, userId) {
    const [result] = await sql.query(`INSERT INTO todos (title, due_date, priority, category, user_id) VALUES (?, ?, ?, ?, ?)`, [title, due_date, priority, category, userId]);
    return result;
}

async function updateTodo(title, due_date, priority, category, todoId, userId) {
    const [result] = await sql.query(`UPDATE todos SET title = ?, due_date = ?, priority = ?, category = ? WHERE todo_id = ? AND  user_id = ?`, [title, due_date, priority, category, todoId, userId]);
    return result;
}

async function getSingleTodo(todoId, userId) {
    const [result] = await sql.query("SELECT title, due_date, priority, category, todo_id FROM todos WHERE todo_id = ? AND  user_id = ?", [todoId, userId]);
    return result[0];
}

const formValidation = [body("title", "To-do title must be between 1 and 100 characters").trim().isLength({ min: 1, max: 100 }).escape(),
body("due_date", "You must insert a valid due date").isISO8601().toDate(),
body("priority", "You must choose a priority level").notEmpty(),
body("category", "You must choose a category").notEmpty(),
]

const todoNewGet = ash(async (req, res) => {
    res.render('new-todo', { title: "New to-do", categories: res.locals.categories });
});

const todoNewPost = [
    formValidation,
    ash(async (req, res) => {
        utilityFunctions.checkIfThereAreErrors(req, res, "/todo/new");
        const { title, due_date, priority, category } = req.body;
        await createTodo(title, due_date, priority, category, res.locals.currentUser.id);
        req.flash("success", "New to-do created");
        res.redirect('/todo/all');
    })];

const todoEditGet = ash(async (req, res, next) => {
    const todoId = req.params.id;
    const todo = await getSingleTodo(todoId, res.locals.currentUser.id);
    if (!todo) {
        return next();
    }
    res.render('edit-todo', { title: "Edit to-do", categories: res.locals.categories, todo })
});

const todoEditPut = [
    formValidation,
    ash(async (req, res) => {
        const todoId = req.params.id;
        utilityFunctions.checkIfThereAreErrors(req, res, `todo/${todoId}`);
        const { title, due_date, priority, category } = req.body;
        await updateTodo(title, due_date, priority, category, todoId, res.locals.currentUser.id);
        req.flash("success", "The to-do was edited");
        res.redirect(`/todo/${todoId}`);
    })];

const todoDelete = ash(async (req, res) => {
    const { id, url } = req.body;
    await sql.query("DELETE FROM todos WHERE todo_id = ? AND user_id = ?", [id, res.locals.currentUser.id]);
    req.flash("success", "The to-do was deleted");
    res.json({ redirect: url });
});

async function getIndexTodosDates(filter, id) {
    let query = `SELECT DISTINCT due_date FROM todos, categories WHERE todos.category = categories.cat_id AND todos.user_id = ?`;
    query += filter;
    const [rows] = await sql.query(query, id);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getIndexTodos(filter, id) {
    let query = `SELECT todo_id, title, due_date, priority, done, name AS category
    FROM todos, categories WHERE todos.category = categories.cat_id AND todos.user_id = ?`;
    query += filter;
    const [rows] = await sql.query(query, id);
    return rows;
}

const getAllTodos = ash(async (req, res) => {
    const filter = utilityFunctions.getTodosFilter(req.query);
    const todos = await getIndexTodos(filter, res.locals.currentUser.id);
    const dates = await getIndexTodosDates(filter, res.locals.currentUser.id);
    res.render('index', { title: "All todos", categories: res.locals.categories, todos, dates });
});

const changeTodoStatus = ash(async (req, res) => {
    const todoId = req.body.id;
    const [result] = await sql.query("SELECT done FROM todos WHERE todo_id = ? AND user_id = ?", [todoId, res.locals.currentUser.id]);
    const status = result[0].done === 0 ? 1 : 0;
    await sql.query("UPDATE todos SET done = ? WHERE todo_id = ?", [status, todoId])
});

module.exports = { todoNewGet, todoNewPost, todoEditGet, todoEditPut, todoDelete, getAllTodos, changeTodoStatus };