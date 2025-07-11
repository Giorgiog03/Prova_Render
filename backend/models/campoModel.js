const mongoose = require('mongoose');

const campoSchema= new mongoose.Schema({
    nome: {
        type: String,
        required:[true, "Il nome del campo è obbligatorio"],
        trim: true,
        },
    immagine: {
        type: String,
        required: [true, "L'immagine del campo è obbligatoria"],
    },
    disponibilità: {
        type: Map,
        of: Number, //1=disponibile, 0 = non disponibile
        default:{}
    }
    
})
module.exports = mongoose.model('Campo',campoSchema);
