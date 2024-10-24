const express = require('express');
const thingController = require("../controllers/Thing");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/', auth, multer, thingController.createThing);

// Endpoint pour obtenir un objet par son ID
router.get('/:id',auth, thingController.getOneThing);

// Endpoint pour obtenir tous les objets
router.get('/',auth, thingController.getAllThing);

// Endpoint pour modifier un objet par son ID
router.put('/:id',auth, multer, thingController.modifyThing);

// Endpoint pour supprimer un objet par son ID
router.delete('/:id',auth, thingController.deleteThing);

module.exports = router;