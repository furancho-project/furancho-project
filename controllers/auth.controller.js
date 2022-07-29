const { mongoose } = require("mongoose");
const { User } = require("../models");

module.exports.register = (req, res, next) => {
    res.render("auth/register")
}


module.exports.doRegister = (req, res, next) => {
    const user = req.body
    user.avatar = req.file.path

    function renderWithErrors(errors) {
        res.status(400).render("auth/register", {
            user: req.body,
            errors
        });
    }

    const { email, name } = req.body

    User.findOne({ email })
        .then(user => {
            if (user) {
                renderWithErrors({ email: "Email xa rexistrado" })
            } else {
                const user = req.body
                return User.create(user)
                    .then(user => res.redirect("/furanchos"))
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors)
            } else {
                next(error)
            }
        })
}