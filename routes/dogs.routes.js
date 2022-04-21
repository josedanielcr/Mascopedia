const { Router } = require('express');
const { getDogBreeds, getDogBreedByName } = require('../controllers/dogsController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();


//gets dogs(20) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getDogBreeds );

//get dog by name - private( token )
router.get('/:name', [
    validateJwt,
    checkFields
], getDogBreedByName );

module.exports = router;