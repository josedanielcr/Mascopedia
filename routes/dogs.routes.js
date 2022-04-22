const { Router } = require('express');
const { getAllAnimals, getAnimalsByName } = require('../controllers/animalController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();


//gets dogs(20) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getAllAnimals );

//get dog by name - private( token )
router.get('/:name', [
    validateJwt,
    checkFields
], getAnimalsByName );

module.exports = router;