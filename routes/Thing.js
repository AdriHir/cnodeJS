const express = require('express');
const stuffController = require("../controllers/Thing");
const router = express.Router();

router.post('/', stuffController.createThing);
// Endpoint pour obtenir un objet par son ID
router.get('/:id', stuffController.getThingById);
// Endpoint pour obtenir tous les objets
router.get('/', stuffController.getThings);
// Endpoint pour modifier un objet par son ID
router.put(':id', stuffController.updateThing);
// Endpoint pour supprimer un objet par son ID
router.delete(':id', stuffController.deleteThing);

module.exports = router;