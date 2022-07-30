const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PW_PATTERN = /^.{6,}$/
const WORK_FACTOR = 10


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: "É necesario un nome de usuari@",
            unique: true,
            maxLength: [20, "O número máximo de caracteres é 20"],
            trim: true
        },
        email: {
            type: String,
            required: "É necesario introducir un email",
            unique: true,
            trim: true,
            lowercase: true,
            match: [EMAIL_PATTERN, "O email non é válido"]
        },
        password: {
            type: String,
            required: "E necesario introducir un contrasinal",
            match: [PW_PATTERN, "O contrasinal ten que ter alomenos 6 caracteres"]
        },
        avatar: {
            type: String,
            /*default: "https://pbs.twimg.com/media/E9AHSreXoAMEdAf.jpg",
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
            },*/
        },
    }
)

userSchema.pre('validate', function (next) {
    this.avatar = this.avatar || undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, WORK_FACTOR)
            .then(hash => {
                this.password = hash
                next()
            })
            .catch(error => next(error))
    } else {
        next()
    }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;