const express = require("express");
const router = express.Router();

const furanchos = require("../controllers/furanchos.controller")

router.get("/", furanchos.list)

module.exports = router