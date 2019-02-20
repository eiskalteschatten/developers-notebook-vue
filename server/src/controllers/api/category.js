'use strict';

const slug = require('slug');

const Category = require('../../models/Category');


function getValues(category) {
    const slugStr = category.slug ? category.slug.toLowerCase() : category.name.toLowerCase();

    return {
        id: category.id ? category.id : '',
        name: category.name,
        slug: slug(slugStr),
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
            const category = await Category.findOne({ where: { id: body.id, userId }});

            if (category) {
                await category.update(values);
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
