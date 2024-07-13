const sql = require('../config/dbConfig.js');
const utilityFunctions = require('./utilityFunctions.js');
const ash = require("express-async-handler");
const { body } = require("express-validator");
const { checkIfThereAreErrors } = require("./utilityFunctions.js");

async function getTodosByCategory(filter, category, userId) {
    let query = "SELECT todo_id, title, due_date, priority, done, name AS category FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ? AND todos.user_id = ?";
    query += filter;
    const [rows] = await sql.query(query, [category, userId]);
    return rows;
}

async function getTodosDatesByCategory(filter, category, userId) {
    let query = "SELECT DISTINCT due_date FROM todos JOIN categories ON todos.category = categories.cat_id WHERE cat_id = ? AND todos.user_id = ?";
    query += filter;
    const [rows] = await sql.query(query, [category, userId]);
    const dates = rows.map(row => row.due_date);
    return dates;
}

async function getCategoryByUrl(categoryUrl, userId) {
    const [result] = await sql.query("SELECT * FROM categories WHERE url = ? AND user_id = ?", [categoryUrl, userId]);
    return result[0];
}

async function getCategoryByName(categoryName, userId) {
    const [result] = await sql.query("SELECT * FROM categories WHERE name = ? AND user_id = ?", [categoryName, userId]);
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

async function createNewCategory(name, userId) {
    const categoryUrl = createCategoryUrl(name);
    const [result] = await sql.query(`INSERT INTO categories (name, url, user_id) VALUES (?, ?, ?)`, [name, categoryUrl, userId]);
    return result;
}

const formValidation = body("name", "Category name must be between 3 and 30 characters").trim().isLength({ min: 3, max: 30 })
    .matches(/\p{L}/u).withMessage("Category name must contain at least one letter").escape().custom(async (value, { req }) => {
        const categoryExists = await getCategoryByName(value, req.user.id);
        if (categoryExists) {
            throw new Error("The category already exists. Please use another name.");
        }
    }).custom(async (value, { req }) => {
        const categoryUrl = createCategoryUrl(value);
        const categoryUrlExists = await getCategoryByUrl(categoryUrl, req.user.id);
        if (categoryUrlExists) {
            throw new Error("The url slug is the same of another category. Please use another name without special characters.");
        }
    });

const todosByCategoryGet = ash(async (req, res, next) => {
    const category = await getCategoryByUrl(req.params.category, req.user.id);
    if (!category) {
        return next();
    }
    const id = category.cat_id;
    const filter = utilityFunctions.getTodosFilter(req.query);
    const dates = await getTodosDatesByCategory(filter, id, req.user.id);
    const todos = await getTodosByCategory(filter, id, req.user.id);
    res.render('category', { title: `${category.name}`, category, todos, dates });
});

const categoryNewGet = ash(async (req, res) => {
    res.render("new-category", { title: "Add a new category" });
});

const categoryNewPost = [
    formValidation,
    ash(async (req, res) => {
        const errorsExist = checkIfThereAreErrors(req, res);
        if (!errorsExist) {
            const { name } = req.body;
            await createNewCategory(name, req.user.id);
            const category = await getCategoryByName(name, req.user.id);
            req.flash("success", "New category added!")
            res.json({ redirect: `/todo/category/${category.url}` })
        }
    }
    )];

const categoryDelete = ash(async (req, res) => {
    const url = req.params.category;
    await sql.query("DELETE FROM categories WHERE url = ? AND user_id = ?", [url, req.user.id]);
    req.flash("success", "The category was deleted");
    res.json({ redirect: '/todo/all' });
});

const categoryPut = [
    formValidation,
    ash(async (req, res) => {
        const url = req.params.category;
        const errorsExist = checkIfThereAreErrors(req, res);
        if (!errorsExist) {
            const { name } = req.body;
            const categoryUrl = createCategoryUrl(name);
            await sql.query("UPDATE categories SET name = ?, url = ? WHERE url = ? AND user_id = ?", [name, categoryUrl, url, req.user.id]);
            req.flash("success", "Category name was updated.")
            res.json({ redirect: `/todo/category/${categoryUrl}` });
        }
    }
    )];

module.exports = { todosByCategoryGet, categoryNewGet, categoryNewPost, categoryDelete, categoryPut };