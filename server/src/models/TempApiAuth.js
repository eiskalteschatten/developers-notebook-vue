'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');


const TempApiAuth = db.define('tempApiAuth', {
    token: Sequelize.STRING,
    validUntil: Sequelize.DATE
},
{
    tableName: 'temp_api_auth'
});

TempApiAuth.sync();

module.exports = TempApiAuth;
