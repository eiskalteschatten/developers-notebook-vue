'use strict';

const slug = require('slug');

const Client = require('../../models/Client');

const ApiControllerFactory = require('../../factories/ApiController');


function getSlug(client) {
    const slugName = client.name ? client.name : client.companyName;
    const slugStr = client.slug ? client.slug.toLowerCase() : slugName.toLowerCase();
    return slug(slugStr);
}

function getValues(client) {
    const categoryIds = [];

    if (client.categories && client.categories.length > 0) {
        for (const category of client.categories) {
            categoryIds.push(category.id);
        }
    }

    return {
        id: client.id ? client.id : '',
        name: client.name,
        slug: client.slug,
        description: client.description,
        color: client.color,
        archived: client.archived,
        avatar: client.avatar,
        companyName: client.companyName,
        isCompany: client.isCompany,
        website: client.website,
        email: client.email,
        telephone: client.telephone,
        fax: client.fax,
        address: client.address,
        notes: client.notes,
        tags: client.tags,
        categoryIds
    };
}

module.exports = router => {
    router.use((req, res, next) => {
        req.controllerFactory = new ApiControllerFactory(Client, getValues);
        next();
    });

    router.get('/', (req, res) => req.controllerFactory.getAll(req, res));
    router.get('/:id', (req, res) => req.controllerFactory.getSingle(req, res));

    router.post('/', async (req, res) => {
        const body = req.body;
        body.slug = getSlug(body);

        try {
            const client = await Client.create(body);
            await client.setUser(req.user);

            if (body.categoryIds) {
                await client.setCategories(body.categoryIds);
            }

            const returnValues = getValues(client.get());
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
            const client = await Client.findOne({ where: { id: body.id, userId }});

            if (client) {
                await client.update(body);

                if (body.categoryIds) {
                    await client.setCategories(body.categoryIds);
                }
            }
            else {
                throw new Error(`No client with the id ${body.id} exists`);
            }

            const returnValues = getValues(client.get());
            res.json(returnValues);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.delete('/:id', (req, res) => req.controllerFactory.delete(req, res));
};
