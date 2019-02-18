'use strict';

const Settings = require('../../models/Settings');


module.exports = router => {
    router.put('/', async (req, res) => {
        const body = req.body;
        const values = {
            theme: body.theme
        };

        try {
            await Settings.update(values, { where: { id: req.user.id }});
            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });
};
