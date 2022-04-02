const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/UserController');
const { checkFields } = require('../middlewares/index');

const router = Router();


//users post
//TODO: checkear que la edad sea valida
//TODO: password valido - encriptar
router.post('/', [
    check('fullName', 'You must provide a name').not().isEmpty(),
    check('email', 'You must provide an email').not().isEmpty(),
    check('email', 'You must a valid email').isEmail(),
    check('age', 'You must provide an age').not().isEmpty(),
    check('password', 'You must provide a password').not().isEmpty(),
    checkFields
], createUser);
router

module.exports = router;