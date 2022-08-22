const { mongoose } = require("mongoose");
const { Comment } = require("../models");


module.exports.list = (req, res, next) => {

    Comment.find()
        .populate({
            path: "comments",
            populate: { path: "author" }
        })
        .then(comments => {
            res.render("furanchos/detail", { comments })
        })
        .catch(error => next(error))
};

module.exports.doCreate = (req, res, next) => {
    const comment = req.body
    comment.author = req.user.id
    comment.furancho = req.params.id

    Comment.create(comment)
        .then(comment => res.redirect("back"))
        .catch(error => {
            console.error(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render("furanchos/detail", { errors: error.errors })
            } else {
                next(error)
            }
        })
};