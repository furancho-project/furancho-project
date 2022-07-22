const { Furancho } = require("../models")

module.exports.list = (req, res, next) => {
    res.render("furanchos/list")
    /*Furancho.find()
        .then(furanchos => {
            res.render("furanchos/list", { furanchos })
        })
        .catch(error => next(error))*/
}

module.exports.create = (req, res, next) => {
    res.render("furanchos/new-furancho")
}