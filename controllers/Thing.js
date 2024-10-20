const Thing = require('../models/Thing');

// Contrôleur pour créer un nouvel objet "Thing"
exports.createThing = (req, res, next) => {
    delete req.body._id; // Supprimer le champ _id pour éviter les conflits avec MongoDB, car _id est généré automatiquement
    const thing = new Thing({
        // Créer un nouvel objet Thing avec les données de la requête
        ...req.body
    });
    // Sauvegarder l'objet dans la base de données
    thing.save()
        .then(() => res.status(201).json({message: 'Objet bien enregistré'})) // Retourner un message de succès
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de sauvegarde
}

// Contrôleur pour obtenir tous les objets "Thing"
exports.getThings = (req, res, next) => {
    Thing.find() // Chercher tous les objets dans la base de données
        .then(things => res.status(200).json(things)) // Retourner tous les objets trouvés
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de recherche
}

// Contrôleur pour obtenir un objet "Thing" par son ID
exports.getThingById = (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // Chercher l'objet avec l'ID spécifié dans la requête
        .then(thing => res.status(200).json(thing)) // Retourner l'objet trouvé
        .catch(error => res.status(404).json({error})); // Gérer les erreurs de recherche
}

// Contrôleur pour mettre à jour un objet "Thing"
exports.updateThing = (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {
        ...req.body,
        _id: req.params.id
    }) // Mettre à jour l'objet avec les nouvelles données et conserver l'ID
        .then(() => res.status(200).json({message: 'Objet modifié !'})) // Retourner un message de succès
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de mise à jour
}

// Contrôleur pour supprimer un objet "Thing"
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}) // Supprimer l'objet avec l'ID spécifié dans la requête
        .then(() => res.status(200).json({message: 'Objet supprimé !'})) // Retourner un message de succès
        .catch(error => res.status(400).json({error})); // Gérer les erreurs de suppression
}