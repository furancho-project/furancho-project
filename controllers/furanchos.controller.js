const { mongoose } = require("mongoose");
const { Furancho } = require("../models");
const menus = require("../data/menus.json");

module.exports.redirect = (req, res, next) => {
    res.redirect("/furanchos")
};

module.exports.list = (req, res, next) => {

    const { name, lat, lng, terrace, accesibility, opened } = req.query
    const criterial = {}

    if (lat && lng) {
        criterial.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 25000
            }
        }
    }

    if (name) {
        criterial.name = new RegExp(name, "i")
    }

    if (opened) {
        const d = new Date()
        d.setMonth(d.getMonth() - 3)

        const closingDate = new Date()
        criterial.openAt = { $gte: d, $lte: closingDate }
    }

    if (terrace) {
        criterial.terrace = true
    }

    if (accesibility) {
        criterial.accesibility = true
    }

    Furancho.find(criterial)
        .then(furanchos => {
            res.render("furanchos/list", { furanchos, query: req.query })
        })
        .catch(error => next(error))
};

module.exports.create = (req, res, next) => {
    res.render("furanchos/new", { menus })
};

module.exports.doCreate = (req, res, next) => {
    const { lat, lng } = req.body
    const furancho = req.body
    furancho.author = req.user.id

    if (req.file) {
        furancho.image = req.file.path
    } else {
        furancho.image = "https://res.cloudinary.com/dyl3cklgp/image/upload/v1659379039/furancho-project/bujki5wj7tnub3u0dsgj.jpg"
    }

    if (lat && lng) {
        furancho.location = {
            type: "Point",
            coordinates: [lng, lat]
        }
    }

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
};

module.exports.detail = (req, res, next) => {
    Furancho.findById(req.params.id)
        .populate("author")
        .populate({
            path: "comments",
            populate: { path: "author" }
        })
        .then((furancho) => {
            if (furancho) {
                res.render("furanchos/detail", { furancho })
            } else {
                res.redirect("/furanchos")
            }
        })
        .catch(err => next(err))
};

module.exports.update = (req, res, next) => {
    Furancho.findById(req.params.id)
        .then((furancho) => {
            if (furancho) {
                res.render("furanchos/update", { furancho, menus })
            } else {
                res.redirect("/furanchos")
            }
        })
        .catch(err => next(err))
};

module.exports.doUpdate = (req, res, next) => {
    const furancho = req.body
    furancho.author = req.user.id

    if (req.file) {
        furancho.image = req.file.path
    } else {
        furancho.image = "https://res.cloudinary.com/dyl3cklgp/image/upload/v1659379039/furancho-project/bujki5wj7tnub3u0dsgj.jpg"
    }

    Furancho.findByIdAndUpdate(req.params.id, furancho, { runValidators: true })
        .then((furancho) => {
            res.redirect(`/furanchos/${furancho.id}/detail`)
        })
        .catch(error => {
            console.error(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render("furanchos/update", { errors: error.errors, furancho, menus })
            } else {
                next(error)
            }
        })
};

module.exports.delete = (req, res, next) => {

    Furancho.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/furanchos")
        })
        .catch((err) => next(err))
};

module.exports.about = (req, res, next) => {
    res.render("furanchos/about")
};


