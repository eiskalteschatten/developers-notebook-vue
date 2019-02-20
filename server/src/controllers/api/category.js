'use strict';

const slug = require('slug');

const Category = require('../../models/Category');


function getValues(category) {
    return {
        name: category.name,
        slug: category.slug ? slug(category.slug) : slug(category.name),
        description: category.description,
        color: category.color,
        parentId: category.parentId
    };
}

module.exports = router => {
    router.get('/all', async (req, res) => {
        const userId = req.user.id;

        try {
            const categories = await Category.findAll({ where: { userId }});
            const allValues = [];

            for (const category of categories) {
                const values = getValues(category.get());
                allValues.push(values);
            }

            res.json(allValues);
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
        const values = getValues(body);

        try {
            const category = await Category.create(values);
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
        const values = getValues(body);

        try {
            const settings = await Settings.findOne({ where: { id: body.id, userId }});

            if (settings) {
                await settings.update(values);
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
};
