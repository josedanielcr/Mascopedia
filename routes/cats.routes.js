const { Router } = require('express');
const { getCats, getCatByName } = require('../controllers/catsController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();

//gets cats(12) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getCats );

//get cat by name - private( token )
router.get('/:name', [
    validateJwt,
    checkFields
], getCatByName );


module.exports = router;