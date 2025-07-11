// index.js è l'entry point per la nostra applicazione
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env nella root folder del progetto
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require("http")
const cors = require('cors'); // Per abilitare richieste Cross-Origin

// importiamo i router 
const authRoutes = require('./routes/authRoutes');
const campoRoutes = require('./routes/campoRoutes');

// creazione dell'app con il framework express
const app = express();
// express() ritorna un app che è una Function di JavaScript, che deve essere passata ad un server
// Node HTTP come callback per gestire le richieste
const server = http.createServer(app);

//controlliamo dal file delle variabili d'ambiente se è stata specificata una porta diversa dalla 3000
const PORT = process.env.PORT || 3000;

// Definiamo i middleware nell'ordine in cui vogliamo vengano eseguiti
app.use(cors({ // Configurazione CORS
    //in origin mettiamo la porta del FRONTEND
    origin: 'https://prova-vercel-lzdq-7kv2y63jq-giorgios-projects-328e8295.vercel.app', // O l'URL del tuo frontend se diverso, o true per tutti
    credentials: true // Necessario per inviare/ricevere cookie cross-origin
}));

app.use(express.json()); // Per parsare il body delle richieste JSON
app.use(express.urlencoded({extended: true})); // Per parsare il body delle richieste URL-encoded
app.use(cookieParser()); // Per parsare i cookie

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/campi', campoRoutes); 


// Route di base per test
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend di MSG!');
});

// Semplice gestore di errori globale
app.use((err, req, res, next) => {
    console.error("Errore nella richiesta:");
    res.status(500).send('Qualcosa è andato storto!');
});

// colleghiamo il database MongoDB
// io lho collegato al mio, E' FUNZIONA!!!!!
mongoose.connect('mongodb+srv://scontardi:EDy7ygrf5KGjdd8L@cluster0.sjaylew.mongodb.net/PRENOTACAMPI_DB?retryWrites=true&w=majority&appName=Cluster0')
//mongoose.connect(process.env.DB_CONNECTION_STRING)
const db = mongoose.connection

// Apriamo una connessione con il database e mettiamo il server in ascolto
db.once('open', () => server.listen(PORT, () => console.log(`App connessa al DataBase e in ascolto sulla porta ${PORT}`))
)
