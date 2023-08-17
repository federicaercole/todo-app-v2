const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const sql = require("./dbConfig");

async function getUserByEmail(email) {
    const [result] = await sql.query("SELECT * FROM users WHERE email = ?", email);
    return result[0];
}

async function getUserById(id) {
    const [result] = await sql.query("SELECT * FROM users WHERE id = ?", id);
    return result[0];
}

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await getUserByEmail(username);
            if (!user) {
                return done(null, false);
            };
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            });
        } catch (err) {
            return done(err);
        };
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    };
});
