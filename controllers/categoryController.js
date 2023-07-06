const sql = require('../models/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');

async function getTodosByCategory(categoryName) {
    const [rows] = await sql.query("SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id WHERE categories.name = ? ORDER BY due_date DESC", categoryName);
    return rows;
}

async function getTodoDatesByCategory(category) {
    const [rows] = await sql.query("SELECT DISTINCT due_date, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id WHERE categories.name = ? ORDER BY due_date DESC", category);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getCategoryName(categoryUrl) {
    const [rows] = await sql.query("SELECT name FROM categories WHERE categories.url = ?", categoryUrl);
    return rows[0].name;
}

async function todosByCategoryGet(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    const category = await getCategoryName(req.params.category);
    const dates = await getTodoDatesByCategory(category);
    const todos = await getTodosByCategory(category);
    res.render('category', { title: `${category}`, categoryUrl: req.params.category, categories, todos, dates });
}

async function categoryNewGet(req, res) {
    const categories = await utilityFunctions.getAllCategories();
    res.render("new-category", { title: "Add a new category", categories });
}

async function createNewCategory(name) {
    const categoryUrl = name.toLowerCase().replace(/\s+/g, "-");
    const [result] = await sql.query(`INSERT INTO categories (name, url) VALUES (?, ?)`, [name, categoryUrl]);
    return result;
}

async function categoryNewPost(req, res) {
    const { name } = req.body;
    await createNewCategory(name);
    res.redirect("/category/new");
}

module.exports = { todosByCategoryGet, categoryNewGet, categoryNewPost }