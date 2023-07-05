const utilityFunctions = require('./utilityFunctions')

async function getAll(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    const dates = await utilityFunctions.getTodoDates();
    const todos = await utilityFunctions.getAllTodos();
    res.render('index', { title: "All todos", categories, todos, dates });
}

module.exports = { getAll };