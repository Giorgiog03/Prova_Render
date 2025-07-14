const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//middleware che verifica la validità dell'access token. In caso positivo imposta req.userId e chiama il next middleware,
//altrimenti risponde con un messaggio d'errore

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Non autorizzato: Token mancante o malformato' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('Errore verifica JWT:', err.name, err.message);
            return res.status(403).json({ message: 'Proibito: Token non valido o scaduto' });
        }
        req.userId = decoded.userId;
        next();
    });
};
module.exports = { verifyAccessToken };