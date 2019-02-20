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

Category.sync();

module.exports = Category;
