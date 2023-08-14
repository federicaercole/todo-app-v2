const sql = require('../models/dbConfig.js');
const ash = require("express-async-handler");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

const accountCreationValidation = [body("email", "Must be a valid email address").trim().isEmail().bail().custom(async value => {
    const [user] = await sql.query("SELECT email FROM users WHERE email = ?", value);
    if (user[0]) {
        throw new Error("Email already in use, insert another address");
    }
}),
body("password", "Password must be at least 8 characters and contain at least one number and one symbol").isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 0,
    minUppercase: 0,
    returnScore: false,
}),
body("confirm-password", "Passwords do not match").notEmpty().custom((value, { req }) => {
    return value === req.body.password;
})];


const userNewPost = [accountCreationValidation, ash(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array());
        return res.redirect(`sign-up`);
    }
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.query("INSERT INTO users (email, password) VALUES(?,?)", [email, hashedPassword]);
    req.flash("success", "Your account was succefully created");
    res.redirect('sign-in');
})];

module.exports = { userNewPost };