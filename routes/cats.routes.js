const { Router } = require('express');
const { getAllAnimals, getAnimalsByName } = require('../controllers/animalController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();

//gets cats(12) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getAllAnimals );

//get cat by name - private( token )
router.get('/:name', [
    validateJwt,
    checkFields
], getAnimalsByName );


module.exports = router;