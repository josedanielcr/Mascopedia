const { request, response } = require('express');
const axios = require('axios').default;
const baseUrl = 'https://api.thecatapi.com/v1/';

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

module.exports = {
    getCats
}