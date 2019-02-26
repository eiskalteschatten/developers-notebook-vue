'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');
const Client = require('./Client');

const Category = require('./Category');
const ProjectCategory = require('./relationships/ProjectCategory');

const Project = db.define('project', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING,
    website: Sequelize.STRING,
    archived: Sequelize.BOOLEAN,
    finished: Sequelize.BOOLEAN,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    notes: Sequelize.STRING,
    tags: Sequelize.ARRAY(Sequelize.STRING)
});

User.hasMany(Project);
Project.belongsTo(User);

Project.belongsToMany(Category, { through: ProjectCategory });
Category.belongsToMany(Project, { through: ProjectCategory });

Client.hasMany(Project);
Project.belongsTo(Client);


Project.getAllWithRelated = async function(userId) {
    return await this.findAll({
        where: { userId },
        include: [
            {
                model: Category,
                attributes: [ 'id' ]
            },
            {
                model: Client,
                attributes: [ 'id', 'name' ]
            }
        ]
    });
};


Project.sync();

module.exports = Project;
