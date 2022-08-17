const mongoose = require("mongoose")
const Schema = mongoose.Schema
const menus = require("../data/menus.json")
const cities = require("../data/cities.json")


PHONE_PATTERN = /^(6|7|8|9)([0-9][ -]*){8}$/

const furanchoSchema = new Schema({
    name: {
        type: String,
        required: "O furancho ten que ter nome, ou?",
        minLength: [3, "Ten que ter polo menos 3 caracteres"],
        maxLength: [30, "Excediches o número máximo de caracteres"],
        trim: true
    },
    
    phone: {
        type: String,
        match: [PHONE_PATTERN,"Non é un número válido"],
        trim: true,
    },
    openAt: {
        type: Date,
    },
    closeAt: { 
        type: Date,
    },
    schedule: {
        type: String
    },
    address: {
        type: String,
        required: "O furancho ten que ter enderezo, ou?",
        minLength: [3, "Ten que ter polo menos 3 caracteres"],
    },
    city: {
        type: [{
            type: String,
            enum: cities,
        }],
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],  
        },
        coordinates: {
            type: [Number],
            //index: "2dsphere",
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

furanchoSchema.index({ location: '2dsphere'})

const Furancho = mongoose.model("Furancho", furanchoSchema);
module.exports = Furancho;
