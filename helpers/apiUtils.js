const { request, response } = require('express');


/**
 * It returns a generic response to the client.
 * @param [req] - The request object
 * @param [res] - The response object
 * @param data - The data you want to send back to the client.
 * @returns response.
 */
const returnGenericResponse = ( req = request, res = response, data ) => {

    try {
        return res.status( 200 ).json( data );
    } catch (error) {
        return res.status( 500 ).json({
            msg : 'An error has ocurred, please try again, if the error continuous contact to your administrator'
        })
    }

}

module.exports = {
    returnGenericResponse
}