const ash = require("express-async-handler");

const userSignUpGet = ash(async (req, res) => {
    res.render('sign-up', { title: "Sign up" });
});

const userSignInGet = ash(async (req, res) => {
    res.render('sign-in', { title: "Sign in" });
});

const userLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

module.exports = { userSignUpGet, userSignInGet, userLogout };