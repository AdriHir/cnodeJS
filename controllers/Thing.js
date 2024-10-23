const Thing = require('../models/thing');
const fs = require("node:fs");


// Création d'un nouvel objet "Thing"
exports.createThing = (req, res, next) => {
    // Parse le corps de la requête pour obtenir les données de l'objet
    const thingObject = JSON.parse(req.body.thing);
    // Supprime les propriétés _id et _userId car elles ne doivent pas être définies par le client
    delete thingObject._id;
    delete thingObject._userId;
    // Crée une nouvelle instance de "Thing" avec les données de l'objet et les informations d'utilisateur et de l'image
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId, // Récupère l'ID utilisateur depuis le middleware d'authentification
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Construit l'URL de l'image
    });

    // Sauvegarde l'objet "Thing" dans la base de données
    thing.save()
        .then(() => {
            res.status(201).json({message: 'Objet enregistré !'}) // Répond avec un succès
        })
        .catch(error => {
            res.status(400).json({error}) // Répond avec une erreur si la sauvegarde échoue
        })
};

// Récupération d'un seul objet "Thing" par son identifiant
exports.getOneThing = (req, res, next) => {
    // Cherche l'objet "Thing" par son ID
    Thing.findOne({
        _id: req.params.id
    })
        .then((thing) => {
            res.status(200).json(thing); // Répond avec l'objet trouvé
        })
        .catch((error) => {
            res.status(404).json({ error: error }); // Répond avec une erreur si l'objet n'est pas trouvé
        });
};

// Modification d'un objet existant "Thing"
exports.modifyThing = (req, res, next) => {
    // Prépare les données de l'objet pour la modification.
    // Si une nouvelle image est téléchargée, l'URL de l'image est mise à jour.
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId; // Empêche la modification de l'ID utilisateur

    // Cherche l'objet "Thing" par son ID
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            // Vérifie que l'utilisateur qui demande la modification est bien le propriétaire de l'objet
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                // Met à jour l'objet dans la base de données
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error }); // Répond avec une erreur si la recherche de l'objet échoue
        });
};

// Suppression d'un objet "Thing" par son identifiant
exports.deleteThing = (req, res, next) => {
    // Cherche l'objet "Thing" par son ID
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            // Vérifie que l'utilisateur qui demande la suppression est bien le propriétaire de l'objet
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                // Récupère le nom de fichier de l'image pour suppression
                const filename = thing.imageUrl.split('/images/')[1];
                // Supprime l'image du système de fichiers
                fs.unlink(`images/${filename}`, () => {
                    // Supprime l'objet de la base de données
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error }); // Répond avec une erreur si la recherche de l'objet échoue
        });
};

// Récupération de tous les objets "Thing"
exports.getAllThing = (req, res, next) => {
    // Cherche tous les objets "Thing" dans la base de données
    Thing.find()
        .then((things) => {
            res.status(200).json(things); // Répond avec la liste des objets trouvés
        })
        .catch((error) => {
            res.status(400).json({ error: error }); // Répond avec une erreur si la recherche échoue
        });
};