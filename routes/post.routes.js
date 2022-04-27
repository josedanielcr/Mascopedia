const { Router } = require('express');
const { check } = require('express-validator');
const {
    createPost,
    getPosts,
    getMyPosts,
    editPost,
    deletePost,
    getPostsByBreedId
} = require('../controllers/postController');

const {
    checkFields,
    validateJwt
} = require('../middlewares/index');

const router = Router();


//posts post - private
router.post('/', [

    validateJwt,
    check('authorName', 'You must provide a name').not().isEmpty(),
    check('authorEmail', 'You must provide an email').isEmail(),
    check('title', 'You must a valid email').not().isEmpty(),
    check('text', 'You must provide a text').not().isEmpty(),
    check('breed', 'You must provide a breed').not().isEmpty(),
    check('breedType', 'You must provide a breedType').not().isEmpty(),
    checkFields,
], createPost);

// get all posts - private
router.get('/getPosts', [
    validateJwt
], getPosts);

//get pots by breed id
router.get('/:id/:type',[
    validateJwt,
    checkFields
], getPostsByBreedId );

// get my posts - private
router.get('/getMyPosts', [
    validateJwt
], getMyPosts);

//update posts
router.post('/editPost', [
    validateJwt,
    check('title', 'You must a valid email').not().isEmpty(),
    check('text', 'You must provide a text').not().isEmpty(),
    checkFields,
], editPost);

//delete posts
router.delete('/deletePost', [
    validateJwt
], deletePost);


module.exports = router;