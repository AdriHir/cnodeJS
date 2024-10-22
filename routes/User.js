const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');



router.post('/signup', UserController.register);
router.post('/login', UserController.login);


router.post('/', UserController.createThing);
// Endpoint pour obtenir un utilisateur par son ID
router.get('/:id', UserController.getThingById);
// Endpoint pour obtenir tous les utilisateurs
router.get('/', UserController.getThings);
// Endpoint pour modifier un utilisateur par son ID
router.put(':id', UserController.updateThing);
// Endpoint pour supprimer un utilisateur par son ID
router.delete(':id', UserController.deleteThing);

module.exports = router;