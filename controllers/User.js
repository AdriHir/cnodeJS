const User = require('../models/User');
const hashbcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const macle = process.env.MACLE;


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
    // Recherche de l'utilisateur dans la base de données par email
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si l'utilisateur n'est pas trouvé, retourner une erreur 401 (Accès refusé)
            if (!user) {
                return res.status(401).json({ message: 'login/mot de passe incorrecte' });
            }
            // Comparaison du mot de passe fourni avec le mot de passe stocké dans la base de données
            hashbcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si le mot de passe est invalide, retourner une erreur 401 (Accès refusé)
                    if (!valid) {
                        return res.status(401).json({ message: 'login/mot de passe incorrecte' });
                    }
                    // Si le mot de passe est valide, retourner une réponse avec l'ID utilisateur et le token (vide pour le moment)
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${macle.MACLE}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                // Gestion des erreurs lors de la comparaison des mots de passe
                .catch(error => res.status(500).json({ error }));
        })
        // Gestion des erreurs lors de la recherche de l'utilisateur
        .catch(error => res.status(500).json({ error }));
};