const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

// Récupérer la clé secrète pour signer les tokens depuis les variables d'environnement
const macle = process.env.MACLE;

// Middleware pour l'authentification
module.exports = (req, res, next) => {
    try {
        // Récupérer le token depuis les en-têtes de la requête HTTP
        // En supposant que le format de l'en-tête est "Authorization: Bearer <token>"
        const token = req.headers.authorization.split(' ')[1];

        // Vérifier et décoder le token en utilisant la clé secrète
        const decodedToken = jwt.verify(token, macle);

        // Extraire l'ID utilisateur du token décodé
        const userId = decodedToken.userId;

        // Ajouter l'ID utilisateur décodé à l'objet `req` pour une utilisation ultérieure dans les middlewares ou les route handlers
        req.auth = {
            userId: userId
        };

        // Passer au middleware suivant
        next();
    } catch (error) {
        // Si une erreur survient (par exemple, token invalid), répondre avec une erreur 401 (Accès refusé)
        res.status(401).json({ error });
    }
};