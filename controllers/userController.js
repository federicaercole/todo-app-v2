const sql = require('../config/dbConfig.js');
const ash = require("express-async-handler");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { body } = require("express-validator");
const { checkIfThereAreErrors } = require("./utilityFunctions.js");

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
body("confirm-password", "Passwords do not match").notEmpty().bail().custom((value, { req }) => {
    return value === req.body.password;
})];

const userNewPost = [accountCreationValidation, ash(async (req, res) => {
    const errorsExist = checkIfThereAreErrors(req, res);
    if (!errorsExist) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql.query("INSERT INTO users (email, password) VALUES(?,?)", [email, hashedPassword]);
        req.flash("success", "Your account was succefully created");
        res.json({ redirect: 'sign-in' });
    }
})];

const signInValidation = [body("email", "Must be a valid email address").trim().isEmail(),
body("password", "Password is required").notEmpty()];

const authentication = {
    failureRedirect: "sign-in",
    successRedirect: "/todo/all",
    failureMessage: "Incorrect email address or password"
}

const signIn = [signInValidation, ash(async (req, res, next) => {
    const errorsExist = checkIfThereAreErrors(req, res);
    if (!errorsExist) {
        passport.authenticate("local", function (err, user) {
            if (err) { return next(err); }
            if (!user) {
                req.flash("error", authentication.failureMessage);
                res.json({ redirect: authentication.failureRedirect });
            } else {
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    res.json({ redirect: authentication.successRedirect });
                })
            }
        })(req, res, next);
    }
})];

const signInWithoutValidation = passport.authenticate("local", {
    successRedirect: authentication.successRedirect,
    failureRedirect: authentication.failureRedirect,
    failureFlash: authentication.failureMessage
});

module.exports = { userNewPost, signIn, signInWithoutValidation };