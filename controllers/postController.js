const { request, response } = require('express');
const { BasicInsertOperation } = require('../database/CrudOperations');
const { BasicRetrieveOperation } = require('../database/CrudOperations');
const { BasicUpdateOperation } = require('../database/CrudOperations');
const { BasicDeleteOperation } = require('../database/CrudOperations');
const { PostModel } = require('../models/post');



/**
 * Create a new post in the database
 * @param [req] - The request object.
 * @param [res] - The response object.
 * @returns The user that was created.
 * Melichg
 */
const createPost = async(req = request, res = response) => {

    const { authorName, authorEmail, title, text, breed, breedType } = req.body;

    try {

        const postTmp = new PostModel(authorName, authorEmail, title, text, breed, breedType);
        const createdPost = await BasicInsertOperation(postTmp);
        return res.status(200).json(createdPost);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }


}

const getPosts = async(req = request, res = response) => {

    try {

        const posts = await BasicRetrieveOperation(`SELECT * FROM c
        WHERE c.doc = "post"`);

        return res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }

}
const getMyPosts = async(req = request, res = response) => {

    const { email } = req.user;

    try {

        const myPosts = await BasicRetrieveOperation(`SELECT * from c where c.doc= "post" AND c.authorEmail = "${ email }"`);
        return res.status(200).json(myPosts);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }


}
const editPost = async(req = request, res = response) => {

    const { id, authorName, authorEmail, title, text, breed, breedType } = req.body;
    try {

        const postTmp = new PostModel(authorName, authorEmail, title, text, breed, breedType);
        const editedPost = await BasicUpdateOperation(id, postTmp);
        return res.status(200).json(editedPost);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }


}

const deletePost = async(req = request, res = response) => {

    const { id } = req.body;
    try {
        const deletedPost = await BasicDeleteOperation(id);
        return res.status(200).json({ msg: 'The post was deleted' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }

}


const getPostsByBreedId = async( req = request, res = response ) => {

    const { id, type } = req.params;
    let data = [];
    let posts

    try {
        if(type === 'dog') {
            posts = await BasicRetrieveOperation(`SELECT * from c where c.doc= "post" AND c.breed=${ id } AND c.breedType="${ type }"`);
        }
        else {
            posts = await BasicRetrieveOperation(`SELECT * from c where c.doc= "post" AND c.breed="${ id }" AND c.breedType="${ type }"`);
        }

        posts.map( ( post ) => {
            data.push({
                id : post.id,
                authorName : post.authorName,
                authorEmail: post.authorEmail,
                title : post.title,
                text : post.text
            });
        } );

        if( posts.length === 0 ){
            return res.status(500).json({
                msg: 'No posts found'
            })
        }

        return res.status( 200 ).json( data );
        
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })
    }

}


module.exports = {
    createPost,
    getPosts,
    getMyPosts,
    editPost,
    deletePost,
    getPostsByBreedId
}