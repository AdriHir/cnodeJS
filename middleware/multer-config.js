const multer = require('multer');
// multerest une excellente bibliothèque pour gérer les uploads de fichiers dans les applications Node.js avec Express.
// C'est un middleware bien connu et largement utilisé pour traiter les fichiers multipart/form-data, qui est principalement utilisé pour le téléchargement de fichiers.
// Définir un dictionnaire pour mapper les types MIME aux extensions de fichiers
//npm i multer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configuration du stockage pour multer
const storage = multer.diskStorage({
    // Définir le dossier de destination pour les fichiers uploadés
    destination: (req, file, callback) => {
        // Stocker les fichiers dans le dossier 'images'
        callback(null, 'images');
    },
    // Définir le nom de fichier pour les fichiers uploadés
    filename: (req, file, callback) => {
        // Remplacer les espaces par des underscores dans le nom de fichier original
        const name = file.originalname.split(' ').join('_');
        // Extraire l'extension du fichier à partir de son type MIME
        const extension = MIME_TYPES[file.mimetype];
        // Générer le nom de fichier final avec un timestamp pour assurer l'unicité
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exporter le middleware multer configuré pour gérer les fichiers envoyés dans le champ 'image' des formulaires
module.exports = multer({ storage: storage }).single('image');