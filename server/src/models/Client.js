'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');
const Category = require('./Category');
const ClientCategory = require('./relationships/ClientCategory');

const Client = db.define('client', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING,
    archived: Sequelize.BOOLEAN,
    avatar: Sequelize.STRING,
    companyName: Sequelize.STRING,
    isCompany: Sequelize.BOOLEAN,
    website: Sequelize.STRING,
    email: Sequelize.STRING,
    telephone: Sequelize.STRING,
    fax: Sequelize.STRING,
    address: Sequelize.STRING,
    notes: Sequelize.STRING,
    tags: Sequelize.ARRAY(Sequelize.STRING)
});

User.hasMany(Client);
Client.belongsTo(User);

Client.belongsToMany(Category, { through: ClientCategory });
Category.belongsToMany(Client, { through: ClientCategory });


Client.getAllWithRelated = async function(userId) {
    return await this.findAll({
        where: { userId },
        include: [{
            model: Category,
            attributes: [ 'id' ]
        }]
    });
};


Client.sync();

module.exports = Client;
