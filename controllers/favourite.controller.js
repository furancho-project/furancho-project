const { mongoose } = require("mongoose");
const { Favourite, Furancho } = require("../models");

module.exports.create = (req, res, next) => {
  const likeIt = { userId: req.user.id, furanchoId: req.params.id };

  Favourite.findOne(likeIt)
    .then((favourite) => {
      if (!favourite) {
        Favourite.create(likeIt)
          .then((favourite) => {
            res.redirect("back");
          })
          .catch(next);
      } else {
        favourite
          .delete()
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {

    Favourite.find()
        .populate({
            path: "favourites",
            populate: { path: "userId" }
        })
        .then(favourites => {
            res.render("users/profile", { favourites, furanchos })
        })
        .catch(error => next(error))
} 