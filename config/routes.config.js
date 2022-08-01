const express = require("express");
const router = express.Router(); 
const upload = require("./multer.config")
const secure = require("../middlewares/secure.mid");

const { furanchos, auth } = require("../controllers");

router.get("/furanchos", furanchos.list);
router.get("/furanchos/new", furanchos.create);
router.post("/furanchos/new", upload.single('image'), furanchos.doCreate);
router.get("/furanchos/:id/detail", furanchos.detail);
router.get("/furanchos/:id/update", furanchos.update);
router.post("/furanchos/:id/update", upload.single('image'), furanchos.doUpdate)
router.post("/furanchos/:id/delete", furanchos.delete)

router.get("/register", auth.register);
router.post("/register", upload.single('avatar'), auth.doRegister)

router.get("/login", auth.login);
router.post("/login", auth.doLogin);

router.get("/:id/profile", auth.detail);

module.exports = router;