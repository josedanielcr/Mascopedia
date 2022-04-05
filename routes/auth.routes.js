const { Router }      = require('express');
const { check }       = require('express-validator');
const { login } = require('../controllers/authController');
const { checkFields } = require('../middlewares/index');

const router = Router();

//login public
router.post('/login',[
    check( 'email' , 'You must provide en email').isEmail(),
    check( 'password' , 'You must provide a passaword').not().isEmpty(),
    checkFields
], login);


module.exports = router;