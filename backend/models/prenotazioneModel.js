const mongoose = require('mongoose');
const prenotazioneSchema = new mongoose.Schema({
    autore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    campo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campo",
        required: true
    },
    codice: {
        type: String,
        required: true,
        trim: true
    },
})
module.exports = mongoose.model("Prenotazione",prenotazioneSchema)