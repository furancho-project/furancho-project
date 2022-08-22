const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: "String",
        minLength: [2, "Ten que ter polo menos 3 caracteres"],
        maxLength: [400, "Número máximo de caracteres superado"],
        trim: true,
        require: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    furancho: {
        type: Schema.Types.ObjectId,
        ref: "Furancho",
    },
},
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
