const { mongoose } = require("mongoose")
const { Furancho } = require("../models")
const menus = require("../data/menus.json")

module.exports.list = (req, res, next) => {
    Furancho.find()
        .then(furanchos => {
            res.render("furanchos/list", { furanchos })
        })
        .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
    res.render("furanchos/new", { menus })
}

module.exports.doCreate = (req, res, next) => {
    const furancho = req.body

    Furancho.create(furancho)
        .then(furancho => res.redirect("/furanchos"))
        .catch(error => {
            console.error(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render("furanchos/new", { errors: error.errors, furancho, menus })
            } else {
                next(error)
            }
        })
}

module.exports.update = (req, res, next) => {
    res.render("furanchos/update", { menus })
}

/*module.exports.doUpdate = (req, res, next) => {

}*/