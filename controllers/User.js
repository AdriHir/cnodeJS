const User = require('../models/User');
const hashbcrypt = require('bcrypt');

// Middleware pour l'inscription d'un utilisateur
exports.signup = (req, res, next) => {
    hashbcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Sauvegarde de l'utilisateur dans la base de données
        user.save()
            .then(() => res.status(201).json({ message: 'utilisateur créé' }))
            .catch((err) => { res.status(400).json({ error: err }) });
    })
        .catch((err) => { res.status(500).json({ error: err }) });
};

// Middleware pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
    // À compléter
};