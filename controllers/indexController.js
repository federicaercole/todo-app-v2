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

function getHome(req, res) {
    res.render('homepage', { title: "To-do App Homepage" })
}

const demoUserSignIn = (req, res, next) => {
    req.body.email = process.env.DEMOUSER_EMAIL;
    req.body.password = process.env.DEMOUSER_PASS;
    next();
}

module.exports = { userSignUpGet, userSignInGet, userLogout, getHome, demoUserSignIn };