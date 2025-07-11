const Campo = require('../models/campoModel');
const Recensione = require('../models/recensioneModel');
const Prenotazione = require('../models/prenotazioneModel');


exports.getAllCampi = async (req, res) => {
    try {
        const campi = await Campo.find()

        res.json({
            message: "Campi recuperati con successo.",
            campi,
        });
    } catch (error) {
        console.error("Errore recupero campi:", error);
        res.status(500).json({ message: "Errore del server durante il recupero dei campi." });
    }
};

exports.getAllRecensioni = async (req, res) => {
    try {
        const recensioni = await Recensione.find()
       .populate('autore', 'username'); // recupero nome  dell'autore della recensione

        res.json({
            message: "Recensioni recuperate con successo.",
            recensioni,
        });
    } catch (error) {
        console.error("Errore recupero recensioni:", error);
        res.status(500).json({ message: "Errore del server durante il recupero delle recensioni." });
    }
};

exports.getAllPrenotazioni = async (req, res) => {
    try {
        const prenotazioni = await Prenotazione.find()

        res.json({
            message: "Prenotazioni recuperate con successo.",
            prenotazioni,
        });
    } catch (error) {
        console.error("Errore recupero prenotazioni:", error);
        res.status(500).json({ message: "Errore del server durante il recupero delle prenotazioni." });
    }
};

exports.createRecensione = async (req, res) => {
    try {
        const {testo, campoId} = req.body;
        const autoreId = req.userId; // Ottenuto dal middleware verifyAccessToken

        if (!testo) {
            return res.status(400).json({ message: "Il contenuto della recensione è obbligatorio." });
        }

        const newRecensione = new Recensione({
            autore: autoreId,
            testo,
            campo: campoId
        });

        await newRecensione.save();
        const populatedRecensione = await Recensione.findById(newRecensione._id).populate('autore', 'username');


        res.status(201).json({ message: "Recensione creata con successo!", recensione: populatedRecensione });

    } catch (error) {
        console.error("Errore creazione recensione:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }
        res.status(500).json({ message: "Errore del server durante la creazione della recensione." });
    }
};

exports.deleteRecensione = async (req, res) => {
    try {
        const recensioneId = req.params.recensioneId;
        const userId = req.userId; 

        const recensione = await Recensione.findById(recensioneId);

        if (!recensione) {
            return res.status(404).json({ message: "Recensione non trovata." });
        }
      
        if (recensione.autore.toString() !== userId) {
            return res.status(403).json({ message: "Non autorizzato ad eliminare questa recensione." });
        }

        await Recensione.findByIdAndDelete(recensioneId);

        res.json({ message: "Recensione eliminata con successo." });

    } catch (error) {
        console.error("Errore eliminazione recensione:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID della recensione non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};

exports.prenotaCampo = async (req, res) => {
try {
        const campoId = req.params.campoId;
        const date = req.body.date;
        const userId = req.userId;
        const campo = await Campo.findById(campoId);

        if (!campo) {
            return res.status(404).json({ message: "Campo non trovato." });
        }

      if (campo.disponibilità.get(date) == 0) {
          return res.status(404).json({ message: "Campo non disponibile per quest'orario." });
         } 

      campo.disponibilità.set(date, 0)
      await campo.save();
      const codice = Math.random().toString(36).substring(2,10).toUpperCase();
      const newPrenotazione = new Prenotazione({
          autore: userId,
          date: date,
          campo: campoId,
          codice: codice
      });
      await newPrenotazione.save();
       res.json({
           message: `Campo prenotato con successo per la data ${date}`,
           codice
       });
          } catch (error) {
        console.error("Errore durante la prenotazione:", error);
        res.status(500).json({ message: "Errore del server." });
    }
};
