'use strict';

const Sequelize = require('sequelize');
const {db} = require('../../lib/db');


const TaskCategory = db.define('taskCategory', {
    taskId: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER
},
{
    tableName: 'task_category'
});

TaskCategory.sync();

module.exports = TaskCategory;
