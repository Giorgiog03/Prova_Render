// index.js è l'entry point per la nostra applicazione
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env nella root folder del progetto
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require("http")
const cors = require('cors'); // Per abilitare richieste Cross-Origin

// import dei router
const authRoutes = require('./routes/authRoutes');
const campoRoutes = require('./routes/campoRoutes');

// creazione dell'app con il framework express
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5001', 'https://msg-centro-sportivo-bari.vercel.app'], // URL frontend
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Definizione delle routes API
app.use('/api/auth', authRoutes);
app.use('/api/campi', campoRoutes); 

app.get('/', (req, res) => {
    res.send('Benvenuto nel backend di MSG!');
});

// Semplice gestore di errori globale
app.use((err, req, res, next) => {
    console.error("Errore nella richiesta:");
    res.status(500).send('Qualcosa è andato storto!');
});

// colleghiamo il database MongoDB
mongoose.connect('mongodb+srv://scontardi:EDy7ygrf5KGjdd8L@cluster0.sjaylew.mongodb.net/PRENOTACAMPI_DB?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection

// Apriamo una connessione con il database e mettiamo il server in ascolto
db.once('open', () => server.listen(PORT, () => console.log(`App connessa al DataBase e in ascolto sulla porta ${PORT}`))
)
