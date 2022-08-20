const { mongoose } = require("mongoose");
const { User } = require("../models");


module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
        .populate({
            path: "favourites",
            populate: { path: "furanchoId" }
        })
        .then((user) => {
            if (user) {
                res.render("users/profile", { user })
            } else {
                res.redirect("/furanchos")
            }
        })
        .catch(err => next(err))
}

module.exports.edit = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.render("users/edit", { user })
            } else {
                res.redirect("/furanchos")
            }
        })
        .catch(err => next(err))
}

module.exports.doEdit = (req, res, next) => {
    const newData = { name, password, avatar } = req.body

    if (req.file) {
        req.user.avatar = req.file.path
    } 

    if(!req.password) {
        req.user.password 
    }

    function renderWithErrors(errors) {
        res.status(400).render("users/edit", {
            user: req.body,
            errors
        });
    }

    Object.assign(req.user, newData);

    req.user
        .save()
        .then((user) => {
            res.redirect(`/${user.id}/profile`);
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors)
            } else {
                next(error)
            }
        })
} 

module.exports.delete = (req, res, next) => {

    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/furanchos")
        })
        .catch((err) => next(err))
}