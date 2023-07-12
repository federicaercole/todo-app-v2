const sql = require('../models/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');

async function getTodosByCategory(sort, category) {
    let sortQuery = "SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ?";
    sort === "asc" ? sortQuery += " ORDER BY due_date ASC" : sortQuery += " ORDER BY due_date DESC"
    const [rows] = await sql.query(sortQuery, category);
    return rows;
}

async function getTodoDatesByCategory(sort, category) {
    let sortQuery = "SELECT DISTINCT due_date FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ?";
    sort === "asc" ? sortQuery += " ORDER BY due_date ASC" : sortQuery += " ORDER BY due_date DESC";
    const [rows] = await sql.query(sortQuery, category);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getCategory(categoryUrl) {
    const [result] = await sql.query("SELECT * FROM categories WHERE url = ?", categoryUrl);
    return result[0];
}

async function todosByCategoryGet(req, res) {
    const sort = req.query.sort;
    const categories = await utilityFunctions.getAllCategories();
    const category = await getCategory(req.params.category);
    const id = category.cat_id;
    const dates = await getTodoDatesByCategory(sort, id);
    const todos = await getTodosByCategory(sort, id);
    res.render('category', { title: `${category.name}`, category, categories, todos, dates });
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
    req.flash("success", "New category added!")
    res.redirect("/category/new");
}

async function categoryDelete(req, res) {
    const url = req.params.category;
    const category = await getCategory(url);
    await sql.query("DELETE FROM todos WHERE category = ?", category.cat_id);
    await sql.query("DELETE FROM categories WHERE url = ?", url);
    await req.flash("success", "Category deleted");
    await res.json({ redirect: '/' });
}

async function categoryPut(req, res) {
    const url = req.params.category;
    const { name } = req.body;
    const newCategoryUrl = name.toLowerCase().replace(/\s+/g, "-");
    await sql.query("UPDATE categories SET name = ? WHERE url = ?", [name, url]);
    await sql.query("UPDATE categories SET url = ? WHERE name = ?", [newCategoryUrl, name]);
    await res.json({ redirect: `/category/${newCategoryUrl}` });
}

module.exports = { todosByCategoryGet, categoryNewGet, categoryNewPost, categoryDelete, categoryPut }