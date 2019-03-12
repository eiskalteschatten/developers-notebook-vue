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


function getFrontendValues(client) {
    const categoryIds = [];

    if (client.categories && client.categories.length > 0) {
        for (const category of client.categories) {
            categoryIds.push(category.id);
        }
    }

    return {
        id: client.id ? client.id : null,
        name: client.name,
        slug: client.slug,
        description: client.description,
        color: client.color,
        archived: client.archived,
        avatar: client.avatar,
        companyName: client.companyName,
        isCompany: client.isCompany,
        website: client.website,
        email: client.email,
        telephone: client.telephone,
        fax: client.fax,
        address: client.address,
        notes: client.notes,
        tags: client.tags,
        categoryIds
    };
}

Client.getAllFrontendWithRelated = async function(userId) {
    const clients = await this.findAll({
        where: { userId },
        include: [{
            model: Category,
            attributes: [ 'id' ]
        }]
    });

    return clients.map(result => {
        return getFrontendValues(result.get());
    });
};

Client.getSingleFrontend = async function(id, userId) {
    const client = await this.findOne({
        where: { id, userId }
    });

    return {
        frontendValues: getFrontendValues(client),
        model: client
    };
};

Client.getSingleFrontendWithRelated = async function(id, userId) {
    const client = await this.findOne({
        where: { id, userId },
        include: [{
            model: Category,
            attributes: [ 'id' ]
        }]
    });

    return getFrontendValues(client);
};


Client.sync();

module.exports = Client;
