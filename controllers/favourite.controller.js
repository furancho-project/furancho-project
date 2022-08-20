const { mongoose } = require("mongoose");
const { Favourite } = require("../models");

module.exports.create = (req, res, next) => {
  const likeIt = { userId: req.user.id, furanchoId: req.params.id };
  Favourite.findOne(likeIt)
    .then((favourite) => {
      if (!favourite) {
        Favourite.create(likeIt)
          .then((favourite) => {
            res.redirect(`back`);
          })
          .catch(next);
      } else {
        favourite
          .delete()
          .then(() => {
            res.redirect(`back`);
          })
          .catch(next);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {

    User.findById(req.user.id)
        .populate({
            path: "favourites",
            populate: { path: "furanchoId" }
        })
        .then(user => {
            res.render("users/profile", { user, furanchos })
        })
        .catch(error => next(error))
} 