
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
 * @param [req] - The request object.
 * @param [res] - The response object.
 */
const getDogBreedByName = async( req = request , res = response ) => {

    const { name } = req.params;
    let responseData;

    await axios.get(`${ baseUrl }breeds/search?q=${name}`,{
        headers: { 'x-api-key' : process.env.DOG_API_KEY }
    }).then(( data ) => {
        responseData = data.data;
    }).catch( ( err ) => {
        return res.status( 500 ).json({
            msg : 'An error has ocurred, please try again, if the error continuous contact to your administrator'
        })
    });

    try {
        const animalImages = await getAnimalImages( responseData );

        let counter = 0;
        
        responseData.map( ( animal ) => {
            
            
            animal.image = {};
            animal.image.url = animalImages[ counter ];
            counter++
        });
    
        return res.status( 200 ).json( responseData );
    
    } catch (error) {
        return res.status( 500 ).json({
            msg : 'An error has ocurred, please try again, if the error continuous contact to your administrator'
        })
    }
}


/**
 * It takes an array of objects, loops through the objects, and returns an array of strings.
 * @param [responseData] - an array of objects that contain the animal data
 * @returns An array of promises.
 */
const getAnimalImages = async( responseData = [] ) => {
    
    let promises = [];
    let animalImages = [];

    responseData.map( ( animal ) => {

        if( typeof animal.reference_image_id === 'undefined' ){
            animal.reference_image_id = '';
        }

        promises.push(
            axios.get(`${ baseUrl }images/${ animal.reference_image_id }`, {
                headers: { 'x-api-key' : process.env.DOG_API_KEY }
            })
        );
    } );

    await Promise.all( promises ).then( ( reponses ) => {
        reponses.map( ( response ) => {

            if( typeof response.data.url !== 'undefined' ) animalImages.push(response.data.url);
            else animalImages.push('');

        })
    });

    return animalImages;

}


module.exports = {
    getDogBreeds,
    getDogBreedByName
}