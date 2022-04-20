const { request, response } = require('express');
const { BasicRetrieveOperation } = require('../database/CrudOperations');
const { generateJwt } = require('../helpers/jsonWebToken');
const { comparePwd } = require('../helpers/password-encryption');

/**
 * It retrieves the user from the database and checks if the user exists and if the user is active.
 * If the user exists and is active, it checks if the password is correct. If the password is correct,
 * it generates a token and returns the user and the token.
 * @param [req] - The request object.
 * @param [res] - response object
 * @returns The user and the token
 * @author jcanales
 */
const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const userTemp = await BasicRetrieveOperation(`SELECT * from c where c.email = "${ email }"`);
        const {_rid,_self,_etag,_attachments,_ts,...retrievedUser} = userTemp[0];

        //user validations
        if (!retrievedUser) {
            return res.status(400).json({
                msg: `A user with the ${ email } doesn't exists`
            })
        };

        if (retrievedUser.status != 'ACTV') {
            return res.status(400).json({
                msg: `The user with the ${ email } isn't active, please contact to your administrator`
            })
        };

        //user password check
        if (!comparePwd(password, retrievedUser.password)) {
            return res.status(400).json({
                msg: `Incorrect password, please try again`
            })
        };

        //generate token
        const token = await generateJwt(retrievedUser.id);
        delete retrievedUser.password;

        return res.status(200).json({
            retrievedUser,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: `An internal error has ocurred, if the error persist, please contact to your administrator`
        });
    }

}


module.exports = {
    login
}