const express = require('express');
const Thing = require("../models/Thing");
const router = express.Router();

router.post('/', (req, res, next) => {
    delete req.body._id; // Supprimer le champ _id pour éviter les conflits avec MongoDB
    const thing = new Thing({
        ...req.body // Créer un nouvel objet Thing avec les données de la requête
    });
    thing.save() // Sauvegarder l'objet dans la base de données
        .then(() => res.status(201).json({message: 'Objet bien enregistré'}))
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de sauvegarde
});

// Endpoint pour obtenir un objet par son ID
router.get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // Chercher l'objet avec l'ID correspondant
        .then(thing => res.status(200).json(thing)) // Retourner l'objet trouvé
        .catch(error => res.status(404).json({error})); // Gérer les erreurs de recherche
});

// Endpoint pour obtenir tous les objets
router.get('/', (req, res, next) => {
    Thing.find() // Chercher tous les objets dans la base de données
        .then(things => res.status(200).json(things)) // Retourner tous les objets trouvés
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de recherche
});

// Endpoint pour modifier un objet par son ID
router.put(':id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {
        ...req.body,
        _id: req.params.id
    }) // Mettre à jour l'objet avec les nouvelles données
        .then(() => res.status(200).json({message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de mise à jour
});

// Endpoint pour supprimer un objet par son ID
router.delete(':id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}) // Supprimer l'objet avec l'ID correspondant
        .then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de suppression
});

module.exports = router;