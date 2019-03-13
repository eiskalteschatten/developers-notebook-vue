'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');
const Client = require('./Client');
const Category = require('./Category');
const Project = require('./Project');
const TaskCategory = require('./relationships/TaskCategory');

const Task = db.define('task', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    color: Sequelize.STRING,
    archived: Sequelize.BOOLEAN,
    finished: Sequelize.BOOLEAN,
    parentId: Sequelize.INTEGER,
    dueDate: Sequelize.DATE,
    timeNeeded: Sequelize.STRING,
    notes: Sequelize.STRING,
    tags: Sequelize.ARRAY(Sequelize.STRING)
});

User.hasMany(Task);
Task.belongsTo(User);

Task.belongsToMany(Category, { through: TaskCategory });
Category.belongsToMany(Task, { through: TaskCategory });

Client.hasMany(Task);
Task.belongsTo(Client);

Project.hasMany(Task);
Task.belongsTo(Project);


function getFrontendValues(task) {
    const categoryIds = [];

    if (task.categories && task.categories.length > 0) {
        for (const category of task.categories) {
            categoryIds.push(category.id);
        }
    }

    return {
        id: task.id ? task.id : null,
        name: task.name,
        slug: task.slug,
        color: task.color,
        archived: task.archived,
        finished: task.finished,
        parentId: task.parentId,
        dueDate: task.dueDate,
        timeNeeded: task.timeNeeded,
        notes: task.notes,
        tags: task.tags,
        clientId: task.client ? task.client.id : null,
        projectId: task.project ? task.project.id : null,
        categoryIds
    };
}


Task.getAllFrontendWithRelated = async function(userId) {
    const tasks = await this.findAll({
        where: { userId },
        include: [
            {
                model: Category,
                attributes: [ 'id' ]
            },
            {
                model: Client,
                attributes: [ 'id' ]
            },
            {
                model: Project,
                attributes: [ 'id' ]
            }
        ]
    });

    return tasks.map(result => {
        return getFrontendValues(result.get());
    });
};

Task.getSingleFrontend = async function(id, userId) {
    const task = await this.findOne({
        where: { id, userId }
    });

    return {
        frontendValues: getFrontendValues(task),
        model: task
    };
};

Task.getSingleFrontendWithRelated = async function(id, userId) {
    const task = await this.findOne({
        where: { id, userId },
        include: [{
            model: Category,
            attributes: [ 'id' ]
        },
        {
            model: Client,
            attributes: [ 'id' ]
        },
        {
            model: Project,
            attributes: [ 'id' ]
        }]
    });

    return getFrontendValues(task);
};


Task.sync();

module.exports = Task;
