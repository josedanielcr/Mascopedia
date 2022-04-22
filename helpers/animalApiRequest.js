const axios = require('axios').default;

/**
 * It makes a request to an API, and returns the data from the API.
 * @param url - The url to make the request to.
 */
const animalApiRequest = ( url ) => {

    return axios.get( url ,{
        headers: { 'x-api-key' : process.env.DOG_API_KEY }
    });

}

/**
 * It takes two arguments, a baseUrl and an imagesUrl, and returns an array of objects
 * property that contains an object with a url property.
 * @param [imagesUrl]
 * @returns An array of objects.
 */
const getAnimalByName = async( baseUrl = '' , imagesUrl = '') => {

    const { data } = await animalApiRequest( baseUrl );

    try {
        let counter = 0;
        const animalImages = await getAnimalImages( data, imagesUrl );
        
        data.map( ( animal ) => {
            
            animal.image = {};
            animal.image.url = animalImages[ counter ];
            counter++
        });
    
        return data;
    
    } catch (error) {
        throw new Error( error );
    }

}

/**
 * It takes an array of objects, and returns an array of strings.
 * @param [responseData] - This is the response data from the API request.
 * @param [baseUrl] - The base url for the api request.
 * @returns An array of images of the breeds.
 */
const getAnimalImages = async( responseData = [], baseUrl = '' ) => {

    let promises = [];
    let animalImages = [];

    responseData.map( ( animal ) => {

        if( typeof animal.reference_image_id === 'undefined' ){
            animal.reference_image_id = '';
        }

        promises.push(
            animalApiRequest( `${ baseUrl }images/${ animal.reference_image_id }` )
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
    animalApiRequest,
    getAnimalByName
}