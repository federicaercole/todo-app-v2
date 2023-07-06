const utilityFunctions = require('./utilityFunctions')
const sql = require('../models/dbConfig');

async function getAll(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    const dates = await utilityFunctions.getTodoDates();
    const todos = await utilityFunctions.getAllTodos();
    res.render('index', { title: "All todos", categories, todos, dates });
}

async function changeTodoStatus(req, res) {
    const id = req.body.id;
    const [result] = await sql.query("SELECT done FROM todos WHERE todo_id = ? ", id);
    const status = result[0].done === 0 ? 1 : 0;
    await sql.query("UPDATE todos SET done = ? WHERE todo_id = ?", [status, id])
};

module.exports = { getAll, changeTodoStatus };