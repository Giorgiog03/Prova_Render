// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const campoController = require('../controllers/campoController');
const { verifyAccessToken } = require('../middlewares/authMiddleware'); // Middleware di autenticazione






// GET /api/campi - Ottieni tutti i campi (feed) - Pubblico
router.get('/', campoController.getAllCampi);

// GET /api/campi/recensioni - Ottieni tutte le recensioni - Pubblico
router.get('/recensioni', campoController.getAllRecensioni);

// POST /api/campi/recensioni- L'Utente pubblica una recensione sotto al campo con campoID specificato - Protetto, solo l'utente
router.post('/recensioni', verifyAccessToken, campoController.createRecensione);//solo utenti autenticati possono creare la recensione sotto a un campo


// DELETE /api/campi/:recensioneId - Elimina una recensione tramite id recensioni - Protetto, solo l'utente
router.delete('/:recensioneId', verifyAccessToken, campoController.deleteRecensione);//solo utenti autenticati possono eliminare la recensione

// POST /api/campi/:campoId/prenotazione- L'utente termina la prenotazione- Protetto, solo  l'utente
router.post('/prenotazioni/:campoId', verifyAccessToken, campoController.prenotaCampo);//solo utenti autenticati possono prenotare il campo




module.exports = router;
