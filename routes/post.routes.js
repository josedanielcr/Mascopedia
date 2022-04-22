const { Router } = require('express');
const { check } = require('express-validator');
const {
    createPost,
    getPosts,
    getMyPosts,
    editPost,
    deletePost
} = require('../controllers/postController');

const {
    checkFields,
    validateJwt
} = require('../middlewares/index');

const router = Router();


//posts post - public

router.post('/createPost', [

    check('authorName', 'You must provide a name').not().isEmpty(),
    check('authorEmail', 'You must provide an email').isEmail(),
    check('title', 'You must a valid email').not().isEmpty(),
    check('text', 'You must provide a text').not().isEmpty(),
    check('breed', 'You must provide a breed').not().isEmpty(),
    checkFields,
    validateJwt
], createPost);

router.get('/getPosts', [
        validateJwt
    ],
    getPosts);

router.get('/getMyPosts', [
    validateJwt

], getMyPosts);

router.post('/editPost', [

    check('title', 'You must a valid email').not().isEmpty(),
    check('text', 'You must provide a text').not().isEmpty(),

    checkFields,
    validateJwt
], editPost);

router.delete('/deletePost', [

    validateJwt
], deletePost);

/*router.post('/createPost', [
    check('authorName', 'You must provide a name').not().isEmpty(),
    check('authorEmail', 'You must provide an email').isEmail(),
    check('title', 'You must a valid email').not().isEmpty(),
    check('text', 'You must provide a text').not().isEmpty(),
    check('breed', 'You must provide a breed').not().isEmpty(),
    checkFields
], createPost);*/

module.exports = router;