'use strict';

const slug = require('slug');

const Project = require('../../models/Project');

const ApiControllerFactory = require('../../factories/ApiController');


function getSlug(project) {
    const slugStr = project.slug ? project.slug.toLowerCase() : project.name.toLowerCase();
    return slug(slugStr);
}

function getValues(project) {
    const categoryIds = [];

    if (project.categories && project.categories.length > 0) {
        for (const category of project.categories) {
            categoryIds.push(category.id);
        }
    }

    return {
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
        client: project.client,
        categoryIds
    };
}

module.exports = router => {
    router.use((req, res, next) => {
        req.controllerFactory = new ApiControllerFactory(Project, getValues);
        next();
    });

    router.get('/', (req, res) => req.controllerFactory.getAll(req, res));
    router.get('/:id', (req, res) => req.controllerFactory.getSingle(req, res));

    router.post('/', async (req, res) => {
        const body = req.body;
        body.slug = getSlug(body);

        try {
            const project = await Project.create(body);
            await project.setUser(req.user);

            if (body.categoryIds) {
                await project.setCategories(body.categoryIds);
            }

            if (body.clientId) {
                await project.setClient(body.clientId);
            }

            const returnValues = getValues(project.get());
            res.json(returnValues);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.put('/', async (req, res) => {
        const userId = req.user.id;
        const body = req.body;
        body.slug = getSlug(body);

        try {
            const project = await Project.findOne({ where: { id: body.id, userId }});

            if (project) {
                await project.update(body);

                if (body.categoryIds) {
                    await project.setCategories(body.categoryIds);
                }

                if (body.clientId) {
                    await project.setClient(body.clientId);
                }
            }
            else {
                throw new Error(`No project with the id ${body.id} exists`);
            }

            const returnValues = getValues(project.get());
            res.json(returnValues);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.delete('/:id', (req, res) => req.controllerFactory.delete(req, res));
};
