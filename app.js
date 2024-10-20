// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const Thing = require('./models/Thing'); // Importation du modèle Mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Extraction des variables d'environnement pour la connexion MongoDB
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.1qbit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connexion à MongoDB avec Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Connexion à MongoDB échouée !', err));

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

// Endpoint pour créer un nouvel objet
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; // Supprimer le champ _id pour éviter les conflits avec MongoDB
    const thing = new Thing({
        ...req.body // Créer un nouvel objet Thing avec les données de la requête
    });
    thing.save() // Sauvegarder l'objet dans la base de données
        .then(() => res.status(201).json({ message: 'Objet bien enregistré' }))
        .catch(error => res.status(400).json({ error })); // Gérer les erreurs de sauvegarde
});

// Endpoint pour obtenir un objet par son ID
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // Chercher l'objet avec l'ID correspondant
        .then(thing => res.status(200).json(thing)) // Retourner l'objet trouvé
        .catch(error => res.status(404).json({ error })); // Gérer les erreurs de recherche
});

// Endpoint pour obtenir tous les objets
app.get('/api/stuff', (req, res, next) => {
    Thing.find() // Chercher tous les objets dans la base de données
        .then(things => res.status(200).json(things)) // Retourner tous les objets trouvés
        .catch(error => res.status(400).json({ error })); // Gérer les erreurs de recherche
});

// Endpoint pour modifier un objet par son ID
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mettre à jour l'objet avec les nouvelles données
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error })); // Gérer les erreurs de mise à jour
});

// Endpoint pour supprimer un objet par son ID
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }) // Supprimer l'objet avec l'ID correspondant
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error })); // Gérer les erreurs de suppression
});

// Exporter l'application pour l'utiliser dans le fichier principal
module.exports = app;