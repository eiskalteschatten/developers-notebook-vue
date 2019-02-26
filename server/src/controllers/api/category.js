'use strict';

const slug = require('slug');

const Category = require('../../models/Category');

const ApiControllerFactory = require('../../factories/ApiController');


function getSlug(category) {
    const slugStr = category.slug ? category.slug.toLowerCase() : category.name.toLowerCase();
    return slug(slugStr);
}

function getValues(category) {
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

module.exports = router => {
    router.use((req, res, next) => {
        req.controllerFactory = new ApiControllerFactory(Category, getValues);
        next();
    });

    router.get('/', (req, res) => req.controllerFactory.getAll(req, res));

    router.get('/related/:id', async (req, res) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const category = await Category.findOne({ where: { id, userId }});
            const values = getValues(category.get());

            const clientModels = await category.getClients();
            const clients = clientModels.reduce((filtered, client) => {
                if (!client.archived) {
                    const raw = client.get();
                    filtered.push({
                        id: raw.id,
                        name: raw.name,
                        color: raw.color,
                        avatar: raw.avatar,
                        companyName: raw.companyName,
                        isCompany: raw.isCompany
                    });
                }

                return filtered;
            }, []);

            const projectModels = await category.getProjects();
            const projects = projectModels.reduce((filtered, project) => {
                if (!project.archived) {
                    const raw = project.get();
                    filtered.push({
                        id: raw.id,
                        name: raw.name,
                        color: raw.color,
                        startDate: raw.startDate,
                        endDate: raw.endDate,
                        finished: raw.finished
                    });
                }

                return filtered;
            }, []);

            res.json({
                ...values,
                related: { clients, projects }
            });
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.get('/:id', (req, res) => req.controllerFactory.getSingle(req, res));

    router.post('/', async (req, res) => {
        const body = req.body;
        body.slug = getSlug(body);

        try {
            const category = await Category.create(body);
            await category.setUser(req.user);
            const returnValues = getValues(category.get());
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
            const category = await Category.findOne({ where: { id: body.id, userId }});

            if (category) {
                await category.update(body);
            }
            else {
                throw new Error(`No category with the id ${body.id} exists`);
            }
            const returnValues = getValues(category.get());
            res.json(returnValues);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.delete('/:id', (req, res) => req.controllerFactory.delete(req, res));
};
