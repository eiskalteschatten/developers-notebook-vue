'use strict';

const slug = require('slug');

const Project = require('../../models/Project');

const ApiControllerFactory = require('../../factories/ApiController');


function getSlug(project) {
    const slugStr = project.slug ? project.slug.toLowerCase() : project.name.toLowerCase();
    return slug(slugStr);
}

module.exports = router => {
    router.use((req, res, next) => {
        req.controllerFactory = new ApiControllerFactory(Project);
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

            res.status(201).send('');
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

            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.delete('/:id', (req, res) => req.controllerFactory.delete(req, res));
};
