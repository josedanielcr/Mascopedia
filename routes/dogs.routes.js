const { Router } = require('express');
const { check } = require('express-validator');
const { getDogBreeds } = require('../controllers/dogsController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();


//gets dogs(20) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getDogBreeds );


module.exports = router;