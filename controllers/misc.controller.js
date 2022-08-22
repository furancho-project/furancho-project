const { mongoose } = require("mongoose");

module.exports.aboutUs = (req, res, next) => {
    res.render("misc/about-us")
};