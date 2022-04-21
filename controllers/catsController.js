const { request, response } = require('express');
const axios = require('axios').default;
const baseUrl = 'https://api.thecatapi.com/v1/';


/**
 * It's a function that makes a request to an API and returns the response.
 * @param [req] - The request object.
 * @param [res] - The response object.
 */
const getCats = async( req = request, res = response ) => {


    const { limit,page } = req.query;

    await axios.get(`${ baseUrl }breeds?limit=${ limit }&page=${page}`,{
        headers: { 'x-api-key' : process.env.DOG_API_KEY }

    }).then( ( data ) => {
        return res.status( 200 ).json( data.data );

    }).catch( ( err ) => {
        return res.status( 500 ).json({
            msg : 'An error has ocurred, please try again, if the error continuous contact to your administrator'
        })
        
    });

}


/**
 * It's a function that makes a request to an API and returns the response.
 * @param [req] - request
 * @param [res] - The response object.
 */
const getCatByName = async( req = request , res = response ) => {

    const { name } = req.params;

    await axios.get(`${ baseUrl }breeds/search?q=${name}`,{
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
    getCats,
    getCatByName
}