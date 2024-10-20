// Importer le module http natif de Node.js
const http = require('http');

// Importer l'application Express définie dans app.js
const app = require('./app');

// Fonction pour normaliser le port en un nombre, une chaîne, ou false
const normalizePort = val => {
    const port = parseInt(val, 10);

    // Vérifie si le port est un numéro
    if (isNaN(port)) {
        return val;
    }

    // Vérifie si le port est un numéro strictement positif
    if (port >= 0) {
        return port;
    }
    return false;
};

// Définir le port sur lequel l'application va écouter, en utilisant la fonction normalizePort
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Créer un serveur HTTP utilisant l'application Express
const server = http.createServer(app);

// Gestionnaire d'erreurs pour le serveur HTTP
const errorHandler = error => {
    // Si l'erreur n'est pas liée à l'écoute du serveur, lancer l'erreur
    if (error.syscall !== 'listen') {
        throw error;
    }

    // Définir une chaîne pour décrire le bind (nom de la pipe ou numéro de port)
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Gérrer les erreurs spécifiques aux syscalls de serveur HTTP
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1); // Quitter le processus avec un échec
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use.`);
            process.exit(1); // Quitter le processus avec un échec
            break;
        default:
            throw error;
    }
};

// Événements serveur pour gérer les erreurs et confirmer le démarrage
server.on('error', errorHandler);
server.on('listening', () => {
    const addr = server.address();
    // Définir une chaîne pour décrire le bind (nom de la pipe ou numéro de port)
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Listening on ${bind}`); // Afficher un message confirmant que le serveur écoute
});

// Commencer à écouter sur le port défini
server.listen(port);