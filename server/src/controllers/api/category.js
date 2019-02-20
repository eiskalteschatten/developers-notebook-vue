'use strict';

const Category = require('../../models/Category');


function getValues(category) {
    return {
        name: category.name,
        slug: category.slug,
        description: category.description,
        color: category.color,
        parentId: category.parentId
    };
}

module.exports = router => {
    router.get('/:id', async (req, res) => {
        const userId = req.user.id;
        const id = req.params.id;

        try {
            const category = await Category.findOne({ where: { id, userId }});
            const values = getValues(category.get());
            res.status(200).json(values);
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
        const values = getValues(body);

        try {
            const settings = await Settings.findOne({ where: { id: body.id, userId }});

            if (settings) {
                await settings.update(values);
            }
            else {
                throw new Error(`No category with the id ${body.id} exists`);
            }

            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });
};
