const sql = require('../config/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');
const ash = require("express-async-handler");
const { body } = require("express-validator");
const { checkIfThereAreErrors } = require("./utilityFunctions.js");

async function getTodosByCategory(filter, category) {
    let query = "SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ?";
    query += filter;
    const [rows] = await sql.query(query, category);
    return rows;
}

async function getTodosDatesByCategory(filter, category) {
    let query = "SELECT DISTINCT due_date FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ?";
    query += filter;
    const [rows] = await sql.query(query, category);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getCategoryByUrl(categoryUrl) {
    const [result] = await sql.query("SELECT * FROM categories WHERE url = ?", categoryUrl);
    return result[0];
}

async function getCategoryByName(categoryName) {
    const [result] = await sql.query("SELECT * FROM categories WHERE name = ?", categoryName);
    return result[0];
}

function createCategoryUrl(categoryName) {
    return categoryName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, '');
}

async function createNewCategory(name) {
    const categoryUrl = createCategoryUrl(name);
    const [result] = await sql.query(`INSERT INTO categories (name, url) VALUES (?, ?)`, [name, categoryUrl]);
    return result;
}

const formValidation = body("name", "Category name must be between 3 and 30 characters").trim().isLength({ min: 3, max: 30 })
    .matches(/\p{L}/u).withMessage("Category name must contain at least one letter").escape().custom(async value => {
        const categoryExists = await getCategoryByName(value);
        if (categoryExists) {
            throw new Error("The category already exists. Please use another name.");
        }
    }).custom(async value => {
        const categoryUrl = createCategoryUrl(value);
        const categoryUrlExists = await getCategoryByUrl(categoryUrl);
        if (categoryUrlExists) {
            throw new Error("The url slug is the same of another category. Please use another name without special characters.");
        }
    });

const todosByCategoryGet = ash(async (req, res, next) => {
    const category = await getCategoryByUrl(req.params.category);
    if (!category) {
        return next();
    }
    const id = category.cat_id;
    const filter = utilityFunctions.getTodosFilter(req.query);
    const dates = await getTodosDatesByCategory(filter, id);
    const todos = await getTodosByCategory(filter, id);
    res.render('category', { title: `${category.name}`, category, categories: res.locals.categories, todos, dates });
});

const categoryNewGet = ash(async (req, res) => {
    res.render("new-category", { title: "Add a new category", categories: res.locals.categories });
});

const categoryNewPost = [
    formValidation,
    ash(async (req, res) => {
        checkIfThereAreErrors(req, res, "/category/new");
        const { name } = req.body;
        await createNewCategory(name);
        const category = await getCategoryByName(name);
        req.flash("success", "New category added!")
        res.redirect(`/category/${category.url}`);
    }
    )];

const categoryDelete = ash(async (req, res) => {
    const url = req.params.category;
    await sql.query("DELETE FROM categories WHERE url = ?", url);
    req.flash("success", "The category was deleted");
    res.json({ redirect: '/' });
});

const categoryPut = [
    formValidation,
    ash(async (req, res) => {
        const url = req.params.category;
        checkIfThereAreErrors(req, res, `/category/${url}`);
        const { name } = req.body;
        const categoryUrl = createCategoryUrl(name);
        await sql.query("UPDATE categories SET name = ?, url = ? WHERE url = ?", [name, categoryUrl, url]);
        req.flash("success", "Category name was updated.")
        res.redirect(`/category/${categoryUrl}`);
    }
    )];

module.exports = { todosByCategoryGet, categoryNewGet, categoryNewPost, categoryDelete, categoryPut };