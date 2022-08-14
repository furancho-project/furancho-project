const { mongoose } = require("mongoose");
const { User } = require("../models");

module.exports.detail = (req, res, next) => {
    const user = req.params
    res.render("users/profile", { user })
}