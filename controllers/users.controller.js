const { mongoose } = require("mongoose");
const { User } = require("../models");


module.exports.detail = (req, res, next) => {
    const user = req.params
    res.render("users/profile", { user })
}

module.exports.update = (req, res, next) => {
    res.render("users/update")
}