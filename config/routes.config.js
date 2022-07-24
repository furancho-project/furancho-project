const express = require("express");
const router = express.Router();

const furanchos = require("../controllers/furanchos.controller");

router.get("/furanchos", furanchos.list);
router.get("/furanchos/new", furanchos.create);
router.post("/furanchos/new", furanchos.doCreate);
router.get("/furanchos/:id/detail", furanchos.detail);
router.get("/furanchos/:id/update", furanchos.update);
router.post("/furanchos/:id/update", furanchos.doUpdate)
router.post("/furanchos/:id/delete", furanchos.delete)

module.exports = router;