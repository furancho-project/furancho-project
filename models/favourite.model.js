const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  furanchoId: {
    type: Schema.Types.ObjectId,
    ref: "Furancho",
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourite;