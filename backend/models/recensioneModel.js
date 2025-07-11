const mongoose = require('mongoose');
const recensioneSchema = new mongoose.Schema({
    autore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    testo: {
        type: String,
        required: [true, "il testo della recensione è obbligatorio"],
        trim: true
    },
    campo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campo",
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Recensione",recensioneSchema)