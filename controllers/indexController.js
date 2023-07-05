const utilityFunctions = require('./utilityFunctions')

async function getAll(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    const todos = await utilityFunctions.getAllTodos();
    res.render('index', { title: "All todos", categories, todos });
}

module.exports = { getAll };