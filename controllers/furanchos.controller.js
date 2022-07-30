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
    
    if ( req.file) {
        furancho.image = req.file.path
    } else {
        furancho.image = "https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/05/04/cunca-vino.jpeg"  
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
}

module.exports.detail = (req, res, next) => {
    Furancho.findById(req.params.id)
        .then((furancho) => {
            if (furancho) {
                res.render("furanchos/detail", { furancho })
            } else {
                res.redirect("/furanchos")
            }
        })
        .catch(err => next(err))
}

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
}

module.exports.doUpdate = (req, res, next) => {
        const furancho = req.body

        if ( req.file) {
            furancho.image = req.file.path
        } else {
            furancho.image = "https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/05/04/cunca-vino.jpeg"  
        }
        
        Furancho.findByIdAndUpdate(req.params.id, furancho, { runValidators: true })
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
}

module.exports.delete = (req, res, next) => {
    
    Furancho.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/furanchos")
    })
    .catch((err) => next(err))
}

