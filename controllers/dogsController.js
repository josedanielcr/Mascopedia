
const { request, response } = require('express');
const axios = require('axios').default;
const baseUrl = 'https://api.thedogapi.com/v1/';


/**
 * It gets all the dog breeds from the API.
 * @param [req] - The request object that is passed by Express.
 * @param [res] - response
 * @returns The response is a json object with the breeds of the dogs.
 */
const getDogBreeds = async( req = request, res = response ) => {

    const { limit } = req.query;

    await axios.get(`${ baseUrl }breeds?limit=${ limit }`,{
        headers: { 'x-api-key' : process.env.DOG_API_KEY }
    }).then( ( data ) => {
        
        return res.status( 200 ).json( data.data );

    }).catch( ( err ) => {

        return res.status( 500 ).json({
            msg : 'An error has ocurred, please try again, if the error continuous contact to your administrator'
        })

    });

}


module.exports = {
    getDogBreeds
}