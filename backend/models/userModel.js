const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true,"L'username è obbligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required:[true,"L'email è obbigatoria"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "L'email non è valida"],
    },
    password:{
        type: String,
        required:[true, "La password è obbligatoria"],
        minlenght:[6,"La password deve essere di almeno 6 caratteri"],
    },
    immagineprofilo: {
        type: String,
        default: "url_placeholder_immagine_profilo_defualt.jpg",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})
userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
};
module.exports = mongoose.model('User', userSchema);