const sql = require('../models/dbConfig');

async function getAllCategories() {
    const [rows] = await sql.query("SELECT * FROM categories ORDER BY name ASC");
    return rows;
}

function showMessage(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    res.locals.error = req.flash("error");
    next();
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

module.exports = { getAllCategories, showMessage, getTodosFilter };