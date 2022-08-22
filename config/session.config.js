const { User } = require("../models");
const expressSession = require("express-session");
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const session = expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    name: 'session cookie',
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        ttl: 24 * 3600 * 15
    }),
    cookie: {
        secure: process.env.SESSION_SECURE === "true",
        maxAge: 1000 * 60 * 60 * 24 * 15,
        httpOnly: true,
    },
});

const loadUser = (req, res, next) => {
    const { userId } = req.session
    if (userId) {
        User.findById(userId)
            .populate("favourites")
            .then(user => {
                req.user = user
                res.locals.currentUser = user
                next()
            })
            .catch(error => next(error))
    } else {
        next()
    }
};

module.exports = {
    session,
    loadUser,
};
