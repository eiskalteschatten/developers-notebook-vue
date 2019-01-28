'use strict';

const TempApiAuth = require('../../models/TempApiAuth');
const uuid = require('uuid');


async function createNewTempToken() {
    const authToken = uuid.v4().toUpperCase();

    // Make the auth token valid for an hour
    const validUntil = new Date();
    validUntil.setHours(validUntil.getHours() + 1);

    return await TempApiAuth.create({ token: authToken, validUntil });
}

async function checkIfTokenIsValid(token) {
    const result = await TempApiAuth.findOne({ where: { token } });
    const now = new Date();

    if (!result || result.length === 0 || now > result.validUntil) {
        return false;
    }

    return true;
}


module.exports = {
    createNewTempToken,
    checkIfTokenIsValid
};
