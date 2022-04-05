const jwt = require('jsonwebtoken');

/**
 * using the user id it creates a token
 * @param [id] - user id
 * @returns token
 * @author jcanales
 */
const generateJwt = ( id ) => {

    return new Promise ( ( resolve , reject ) => {

        const payload = { id };

        jwt.sign( payload , process.env.SECRETKEY , {
            expiresIn: '2h'
        }, ( err, token) => {
            if( err ) {
                console.log( err );
                reject( 'An error has ocurred during the token generation')
            } else{
                resolve( token );
            }
        });
    });

}

module.exports = {
    generateJwt
}