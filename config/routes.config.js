const express = require("express");
const router = express.Router(); 
const upload = require("./multer.config");
const secure = require("../middlewares/secure.mid");

const { furanchos, auth, comment, users, favourite } = require("../controllers");

router.get("/", furanchos.redirect)
router.get("/furanchos", furanchos.list);
router.get("/furanchos/new", secure.isAuthenticated, furanchos.create);
router.post("/furanchos/new", secure.isAuthenticated, upload.single('image'), furanchos.doCreate);
router.get("/furanchos/:id/detail", furanchos.detail);
router.get("/furanchos/:id/update", secure.isAuthenticated, furanchos.update);
router.get("/furanchos/about", furanchos.about)
router.get("/furanchos/aboutus", furanchos.aboutUs)
router.post("/furanchos/:id/update", secure.isAuthenticated, upload.single('image'), furanchos.doUpdate);
router.post("/furanchos/:id/delete", secure.isAuthenticated, furanchos.delete);

router.post("/furanchos/:id/comment", secure.isAuthenticated, comment.doCreate);

router.get("/register", auth.register);
router.post("/register", upload.single('avatar'), auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);
router.get("/logout", secure.isAuthenticated, auth.logOut);

router.get("/:id/profile", secure.isAuthenticated, users.detail);
router.get("/:id/edit", secure.isAuthenticated, users.edit);
router.post("/:id/edit", secure.isAuthenticated, upload.single('avatar'), users.doEdit); 
router.post("/:id/delete", secure.isAuthenticated, users.delete);

router.post("/furanchos/:id/favourite", secure.isAuthenticated, favourite.create);
router.get("/:id/profile", secure.isAuthenticated, favourite.list);

module.exports = router;