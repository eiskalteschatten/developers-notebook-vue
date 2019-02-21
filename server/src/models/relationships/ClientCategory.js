'use strict';

const Sequelize = require('sequelize');
const {db} = require('../../lib/db');


const ClientCategory = db.define('clientCategory', {
    clientId: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER
},
{
    tableName: 'client_category'
});

ClientCategory.sync();

module.exports = ClientCategory;
