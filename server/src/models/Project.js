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


function getFrontendValues(project) {
    const categoryIds = [];

    if (project.categories && project.categories.length > 0) {
        for (const category of project.categories) {
            categoryIds.push(category.id);
        }
    }

    return {
        id: project.id ? project.id : null,
        name: project.name,
        slug: project.slug,
        description: project.description,
        color: project.color,
        website: project.website,
        archived: project.archived,
        finished: project.finished,
        startDate: project.startDate,
        endDate: project.endDate,
        notes: project.notes,
        tags: project.tags,
        clientId: project.client ? project.client.id : null,
        categoryIds
    };
}


Project.getAllFrontendWithRelated = async function(userId) {
    const projects = await this.findAll({
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

    return projects.map(result => {
        return getFrontendValues(result.get());
    });
};

Project.getSingleFrontend = async function(id, userId) {
    const project = await this.findOne({
        where: { id, userId }
    });

    return {
        frontendValues: getFrontendValues(project),
        model: project
    };
};

Project.getSingleFrontendWithRelated = async function(id, userId) {
    const project = await this.findOne({
        where: { id, userId },
        include: [{
            model: Category,
            attributes: [ 'id' ]
        },
        {
            model: Client,
            attributes: [ 'id', 'name' ]
        }]
    });

    return getFrontendValues(project);
};


Project.sync();

module.exports = Project;
