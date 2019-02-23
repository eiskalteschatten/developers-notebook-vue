'use strict';

const Sequelize = require('sequelize');
const {db} = require('../../lib/db');


const ProjectCategory = db.define('projectCategory', {
    projectId: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER
},
{
    tableName: 'project_category'
});

ProjectCategory.sync();

module.exports = ProjectCategory;
