const sql = require('../config/dbConfig');
const { validationResult } = require("express-validator");

async function getAllCategories(req, res, next) {
    const id = res.locals.currentUser.id;
    const [rows] = await sql.query("SELECT name, url, cat_id FROM categories WHERE user_id = ? ORDER BY name ASC", id);
    res.locals.categories = rows;
    next();
}

function showMessage(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.currentUser = req.user;
        return next();
    }
    res.redirect("/sign-in");
}

function checkIfThereAreErrors(req, res, redirectTo) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array().map(item => item.msg);
        req.flash("error", errorsArray);
        res.redirect(redirectTo);
        return true;
    }
    return false;
}

const getTodosFilter = query => {
    const { sort, priority, done } = query;
    let filter = "";
    if (priority) {
        let priorityFilter = priority.join("' , '");
        filter += ` AND priority IN ('${priorityFilter}')`;
    }
    if (done) {
        let doneFilter = done.join("' , '");
        filter += ` AND done IN ('${doneFilter}')`;
    }
    sort === "asc" ? filter += " ORDER BY due_date ASC" : filter += " ORDER BY due_date DESC";
    return filter;
};

module.exports = { getAllCategories, showMessage, getTodosFilter, checkIfThereAreErrors, isAuth };