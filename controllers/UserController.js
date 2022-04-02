const { request, response } = require('express');
const { BasicInsertOperation } = require('../database/CrudOperations');
const { BasicRetrieveOperation } = require('../database/CrudOperations');
const { BasicUpdateOperation } = require('../database/CrudOperations');
const { BasicDeleteOperation } = require('../database/CrudOperations');
const { encryptPwd } = require('../helpers/password-encryption');
const { UserModel } = require('../models/User');


/**
 * Create a new user in the database
 * @param [req] - The request object.
 * @param [res] - The response object.
 * @returns The user that was created.
 * jcanales
 * Modified by: melichg
 */
const createUser = async(req = request, res = response) => {

    const { fullName, email, age, password } = req.body;

    try {

        const userTempBD = await BasicRetrieveOperation(`SELECT * from c where c.email = "${ email }"`);
        const retrievedUser = userTempBD[0];

        //valida que el email no este registrado
        if (!retrievedUser) {
            if (age >= 18 && age <= 100) {
                const userTmp = new UserModel(fullName, email, age, encryptPwd(password));
                const createdUser = await BasicInsertOperation(userTmp);
                return res.status(200).json(createdUser);
            }
            return res.status(400).json({
                msg: "Age not valid"
            })
        };
        return res.status(400).json({
            msg: `A user with the ${ email } already exists`
        })




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'An error has ocurred, please contact to your administrator'
        })

    }


}



module.exports = {
    createUser
}