// Importation des modules nécessaires
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const thingRoute = require('./routes/Thing.js');
const userRoute = require('./routes/User.js');

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
    .then(() => console.log('Connexion à MongoDB réussie !')) // Si la connexion est réussie
    .catch(err => console.error('La connexion à MongoDB a échoué !', err)); // Si la connexion échoue

const app = express();

// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
// Ce middleware permet de définir les en-têtes de réponse pour autoriser les requêtes venant de différents domaines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorise certains en-têtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorise certaines méthodes HTTP
    next(); // Passe à la middleware suivante
});

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json()); // Convertit les requêtes JSON en objets JavaScript utilisables

// Importer les routeurs et utiliser les routes définies pour les objets et les utilisateurs
app.use('/api/stuff', thingRoute); // Routes pour les objets "Thing"
app.use('/api/auth', userRoute); // Routes pour l'authentification des utilisateurs
app.use('/images', express.static(path.join(__dirname, 'images'))); // Servir les fichiers images statiques depuis le dossier 'images'

// Exporter l'application pour l'utiliser dans le fichier principal
module.exports = app;