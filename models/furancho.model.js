const mongoose = require("mongoose")
const Schema = mongoose.Schema
const menus = require("../data/menus.json")

PHONE_PATTERN = /^(6|7|8|9)([0-9][ -]*){8}$/

const furanchoSchema = new Schema({
    name: {
        type: String,
        required: "O furancho ten que ter nome, ou?",
        minLength: [3, "Ten que ter polo menos 3 caracteres"],
        maxLength: [30, "Excediches o número máximo de caracteres"],
        trim: true
    },
    address: {
        type: String,
        required: "O furancho ten que ter enderezo, ou?",
        minLength: [3, "Ten que ter polo menos 3 caracteres"],
    },
    phone: {
        type: String,
        //required: "O furancho ten que ter teléfono, ou?",
        match: [PHONE_PATTERN,"Non é un número válido"],
        trim: true,
    },
    openAt: {
        type: Date,
    },
    closeAt: { 
        type: Date,
        //default: function() {this.openAt} utilizar moment.js
    },
    schedule: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            //required: true //dame erro
        },
        coordinates: {
            type: [Number],
            //required: true,
        }
    },
    image: {
        type: String,
    },
    accesibility: {
        type: Boolean,
    },
    terrace: {
        type: Boolean,
    },
    menu: {
        type: [{
            type: String,
            enum: menus
        }],
        required: true
    },
    valid: false,
    author:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ratings: {
        type: String,
    }
},
{timestamps: true}
)

furanchoSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'furancho',
  });

furanchoSchema.pre('validate', function (next) {
    this.image = this.image || undefined;
    next();
});

const Furancho = mongoose.model("Furancho", furanchoSchema);
module.exports = Furancho;
