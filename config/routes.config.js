const express = require("express");
const router = express.Router();

const furanchos = require("../controllers/furanchos.controller")

router.get("/furanchos", furanchos.list)
router.get("/furanchos/new", furanchos.create)
router.post("/furanchos/new", furanchos.doCreate)
router.get("/furanchos/update", furanchos.update)
//router.post("/furanchos/update", furanchos.doUpdate)

module.exports = router