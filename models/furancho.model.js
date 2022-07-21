const mongoose = require("mongoose")
const Schema = mongoose.Schema

const furanchoSchema = new Schema({
    name: {
        type: String,
        required: "O furancho ten que ter nome, ou?",
        minLength: [3, "Ten que ter polo menos 3 caracteres"],
        maxLength: [30, "Excediches o número máximo de caracteres"]
    },
    openAt: {
        type: Date
    },
    closeAt: { 
        type: Date
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    image: {
        type: String,
        default: "https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/05/04/cunca-vino.jpeg",
        validate: {
            validator: function (image) {
                try {
                    new URL(image);
                    return true;
                } catch (error) {
                    return false;
                }
            },
            message: image => `Invalid URL`
        },
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
            enum: ["Táboa de embutidos-queixos", "Pementos, variedade Padrón", "Orella-chourizo", "Zorza-lombo", "Costela", "Ovos fritidos", "Sardiñas ou xureis", "Callos", "Tortilla de patacas", "Non ofrece comida"]
        }],
        required: true
    },
    valid: false,
    author: {
        type: String,
        //id: id
    },
    comments: {
        type: String,
    },
    ratings: {
        type: String,
    }
})

furanchoSchema.pre('validate', function (next) {
    this.image = this.image || undefined;
    next();
});