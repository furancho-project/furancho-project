const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: "String",
        maxLength: [200, "Número máximo de caracteres superado"],
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
    }
},
{timestamps: true}
)

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
