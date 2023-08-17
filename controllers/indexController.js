const ash = require("express-async-handler");

const userSignUpGet = ash(async (req, res) => {
    res.render('sign-up', { title: "Sign up" });
});

const userSignInGet = ash(async (req, res) => {
    res.render('sign-in', { title: "Sign in" });
});

module.exports = { userSignUpGet, userSignInGet };