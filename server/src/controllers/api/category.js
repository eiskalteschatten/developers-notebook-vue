'use strict';

const slug = require('slug');

const Category = require('../../models/Category');


function getSlug(category) {
    const slugStr = category.slug ? category.slug.toLowerCase() : category.name.toLowerCase();
    return slug(slugStr);
}

function getValues(category) {
    return {
        id: category.id ? category.id : '',
        name: category.name,
        slug: getSlug(category),
        description: category.description,
        color: category.color,
        parentId: category.parentId,
        archived: category.archived
    };
}

module.exports = router => {
    router.get('/all', async (req, res) => {
        const userId = req.user.id;

        try {
            const categories = await Category.findAll({ where: { userId }});
            const values = categories.map(category => {
                return getValues(category.get());
            });
            res.json(values);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

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

            res.json({
                ...values,
                related: { clients }
            });
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

    router.get('/:id', async (req, res) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const category = await Category.findOne({ where: { id, userId }});
            const values = getValues(category.get());
            res.json(values);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });

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

    router.delete('/:id', async (req, res) => {
        try {
            await Category.destroy({ where: { userId: req.user.id, id: req.params.id } });
            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });
};
