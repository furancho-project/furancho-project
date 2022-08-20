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

module.exports.update = (req, res, next) => {
    res.render("users/update")
}

