const utilityFunctions = require('./utilityFunctions')
const sql = require('../models/dbConfig');
const ash = require("express-async-handler");

async function getIndexTodosDates(filter) {
    let query = `SELECT DISTINCT due_date FROM todos, categories WHERE todos.category = categories.cat_id`;
    query += filter;
    const [rows] = await sql.query(query);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getIndexTodos(filter) {
    let query = `SELECT todo_id, title, due_date, priority, done, name AS category
    FROM todos, categories WHERE todos.category = categories.cat_id`;
    query += filter;
    const [rows] = await sql.query(query);
    return rows;
}

const getAllTodos = ash(async (req, res) => {
    const filter = utilityFunctions.getTodosFilter(req.query);
    const todos = await getIndexTodos(filter);
    const dates = await getIndexTodosDates(filter);
    res.render('index', { title: "All todos", categories: res.locals.categories, todos, dates });
});

const changeTodoStatus = ash(async (req, res) => {
    const id = req.body.id;
    const [result] = await sql.query("SELECT done FROM todos WHERE todo_id = ?", id);
    const status = result[0].done === 0 ? 1 : 0;
    await sql.query("UPDATE todos SET done = ? WHERE todo_id = ?", [status, id])
});

const userSignUpGet = ash(async (req, res) => {
    res.render('sign-up', { title: "Sign up" });
});

module.exports = { getAllTodos, changeTodoStatus, userSignUpGet };