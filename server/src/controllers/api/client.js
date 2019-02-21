'use strict';

const slug = require('slug');

const Client = require('../../models/Client');


function getValues(client) {
    const slugStr = client.slug ? client.slug.toLowerCase() : client.name.toLowerCase();

    return {
        id: client.id ? client.id : '',
        name: client.name,
        slug: slug(slugStr),
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
        notes: client.notes
    };
}

module.exports = router => {
    router.get('/all', async (req, res) => {
        const userId = req.user.id;

        try {
            const clients = await Client.findAll({ where: { userId }});
            const allValues = [];

            for (const client of clients) {
                const values = getValues(client.get());
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
            const client = await Client.findOne({ where: { id, userId }});
            const values = getValues(client.get());
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
            const client = await Client.create(values);
            await client.setUser(req.user);
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
        const values = getValues(body);

        try {
            const client = await Client.findOne({ where: { id: body.id, userId }});

            if (client) {
                await client.update(values);
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

    router.delete('/:id', async (req, res) => {
        try {
            await Client.destroy({ where: { userId: req.user.id, id: req.params.id } });
            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });
};
