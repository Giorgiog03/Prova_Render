// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const campoController = require('../controllers/campoController');
const { verifyAccessToken } = require('../middlewares/authMiddleware'); // Middleware di autenticazione

// GET /api/campi - Ottieni tutti i campi (feed) - Pubblico
router.get('/', campoController.getAllCampi);

// GET /api/campi/recensioni - Ottieni tutte le recensioni - Pubblico
router.get('/recensioni', campoController.getAllRecensioni);

// POST /api/campi/recensioni- Pubblicazione recensione - Protetto, solo utenti autenticati possono pubblicare una recensione
router.post('/recensioni', verifyAccessToken, campoController.createRecensione);

// DELETE /api/campi/:recensioneId - Elimina una recensione tramite id recensioni - Protetto, solo utenti autenticati possono eliminare la recensione
router.delete('/:recensioneId', verifyAccessToken, campoController.deleteRecensione);

// POST /api/campi/prenotazione/:campoId- L'utente termina la prenotazione- Protetto, solo utenti autenticati possono prenotare il campo
router.post('/prenotazioni/:campoId', verifyAccessToken, campoController.prenotaCampo);

module.exports = router;
