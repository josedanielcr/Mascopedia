const { Router } = require('express');
const { getCats } = require('../controllers/catsController');
const { checkFields, validateJwt } = require('../middlewares/index');

const router = Router();

//gets cats(12) - private( token )
router.get('/', [
    validateJwt,
    checkFields
], getCats );


module.exports = router;