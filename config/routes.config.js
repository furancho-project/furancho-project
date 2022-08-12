const express = require("express");
const router = express.Router(); 
const upload = require("./multer.config")
const secure = require("../middlewares/secure.mid");

const { furanchos, auth, comment } = require("../controllers");

router.get("/furanchos", furanchos.list);
router.get("/furanchos/new", secure.isAuthenticated, furanchos.create);
router.post("/furanchos/new", secure.isAuthenticated, upload.single('image'), furanchos.doCreate);
router.get("/furanchos/:id/detail", furanchos.detail);
router.get("/furanchos/:id/update", secure.isAuthenticated, furanchos.update);
router.post("/furanchos/:id/update", secure.isAuthenticated, upload.single('image'), furanchos.doUpdate)
router.post("/furanchos/:id/delete", secure.isAuthenticated, furanchos.delete)

router.post("/furanchos/:id/detail", secure.isAuthenticated, comment.doCreate);

router.get("/register", auth.register);
router.post("/register", upload.single('avatar'), auth.doRegister)
router.get("/login", auth.login);
router.post("/login", auth.doLogin);
router.get("/:id/profile", secure.isAuthenticated, auth.detail);
router.get("/logout", secure.isAuthenticated, auth.logOut)

module.exports = router;