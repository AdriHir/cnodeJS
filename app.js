// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const Thing = require('./models/Thing'); // Importation du modèle Mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const stuffroute = require('./routes/stuff.js');
// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Extraction des variables d'environnement pour la connexion MongoDB
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.1qbit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connexion à MongoDB avec Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('La onnexion à MongoDB échouée !', err));

const app = express();

// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());
//importe le routeur
app.use('api/stuff', stuffroute);
// Exporter l'application pour l'utiliser dans le fichier principal
module.exports = app;