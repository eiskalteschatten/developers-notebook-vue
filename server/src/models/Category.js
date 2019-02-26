'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');

const Category = db.define('category', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING,
    parentId: Sequelize.INTEGER,
    archived: Sequelize.BOOLEAN
});

User.hasMany(Category);
Category.belongsTo(User);


function getFrontendValues(category) {
    return {
        id: category.id ? category.id : '',
        name: category.name,
        slug: category.slug,
        description: category.description,
        color: category.color,
        parentId: category.parentId,
        archived: category.archived
    };
}

Category.getAllFrontend = async function(userId) {
    const categories = await this.findAll({
        where: { userId }
    });

    return categories.map(result => {
        return getFrontendValues(result.get());
    });
};

Category.getAllFrontendWithRelated = async function(userId) {
    // Categories don't have related items in the data structure hierarchy,
    // but this function is necessary for the API Controller Factory.
    return await this.getAllFrontend(userId);
};

Category.getSingleFrontend = async function(id, userId) {
    const category = await this.findOne({
        where: { id, userId }
    });

    return {
        frontendValues: getFrontendValues(category),
        model: category
    };
};

Category.getSingleFrontendWithRelated = async function(id, userId) {
    // Categories don't have related items in the data structure hierarchy,
    // but this function is necessary for the API Controller Factory.
    return await this.getSingleFrontend(id, userId);
};

Category.getSubcategoryIds = async function(parentId, userId) {
    return await this.findAll({
        where: { parentId, userId },
        attributes: [ 'id' ]
    });
};


Category.sync();

module.exports = Category;
