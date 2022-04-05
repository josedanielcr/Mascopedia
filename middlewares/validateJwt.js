const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { BasicRetrieveOperation } = require('../database/CrudOperations');


const validateJwt = async( req = request , res = response, next ) => {

    const token = req.header('token');

    if (!token){
        return res.status( 401 ).json({
            msg : `There's no token in the request`
        });
    }

    try {

        const { id } = await jwt.verify( token, process.env.SECRETKEY, (err, decoded ) => {
            if( err ){
                if( err.message = 'jwt expired' ){
                    return res.status( 401 ).json({
                        msg : `Token expired`
                    })
                }
            }
            return decoded;
        });

        if( id ){
            const userTmp = await BasicRetrieveOperation(`SELECT * from c where c.id = "${ id }"`);
            const userToReq = userTmp[0];
        
            if ( !userToReq ){
                return res.status( 401 ).json({
                    msg : `Invalid token, user doesn't exist`
                })
            }
    
            if ( userToReq.status != 'ACTV' ){
                return res.status( 401 ).json({
                    msg : `The user isn't active, contact to your administrator`
                })
            }

            req.user = userToReq;
    
            next();
        }
        
    } catch (error) {
        return res.status( 500 ).json({
            msg : 'An error has ocurred, contact to your administrator'
        });
    };

}

module.exports = {
    validateJwt
};