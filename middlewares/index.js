const checkFields = require('../middlewares/check-fields');
const validateJwt = require('../middlewares/validateJwt');

module.exports = {
    ...checkFields,
    ...validateJwt
};