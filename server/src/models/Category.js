'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');

const paginationLimit = 50;

const Category = db.define('category', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING,
    parentId: Sequelize.INTEGER
});

User.hasMany(Category);
Category.belongsTo(User);


Category.getPaginatedSorted = async function(page, websiteId, sortBy = 'name', sortDirection = 'ASC') {
    const models = await this.findAndCountAll({
        where: { websiteId },
        order: [
            [ sortBy, sortDirection ]
        ],
        limit: paginationLimit,
        offset: paginationLimit * (page - 1)
    });

    return {
        model: models,
        raw: models.rows
    };
};

Category.getPaginatedSortedSearch = async function(page, websiteId, sortBy = 'name', sortDirection = 'ASC', query = '') {
    const models = await this.findAndCountAll({
        attributes: [ 'id' ],
        where: {
            websiteId,
            $or: [
                { name: { $iLike: `%${query}%` } },
                { description: { $iLike: `%${query}%` } }
            ]
        },
        order: [
            [ sortBy, sortDirection ]
        ],
        limit: paginationLimit,
        offset: paginationLimit * (page - 1)
    });

    return {
        model: models,
        raw: models.rows
    };
};

Category.sync();

module.exports = Category;
