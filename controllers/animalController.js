const { request, response } = require('express');
const { animalApiRequest, getAnimalByName } = require('../helpers/animalApiRequest');
const { returnGenericResponse } = require('../helpers/apiUtils');
const baseCatUrl = 'https://api.thecatapi.com/v1/';
const baseDogUrl = 'https://api.thedogapi.com/v1/';




const getAllAnimals = async( req = request, res = response ) => {

    const { limit,page } = req.query;
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    if ( fullUrl.includes( 'cats' ) ){
        const { data } = await animalApiRequest(`${ baseCatUrl }breeds?limit=${ limit }&page=${page}`);
        returnGenericResponse( req, res, data );
    } else {
        const { data } = await animalApiRequest(`${ baseDogUrl }breeds?limit=${ limit }&page=${page}`);
        returnGenericResponse( req, res, data );
    }

}


const getAnimalsByName = async( req = request, res = response) => {

    const { name } = req.params; 
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    if ( fullUrl.includes( 'cats' ) ){
        const data = await getAnimalByName(`${ baseCatUrl }breeds/search?q=${name}`, baseCatUrl);
        returnGenericResponse( req, res, data );
    } else {
        const data = await getAnimalByName(`${ baseDogUrl }breeds/search?q=${name}`, baseDogUrl);
        returnGenericResponse( req, res, data );
    }
}


module.exports = {
    getAllAnimals,
    getAnimalsByName
}