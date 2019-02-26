'use strict';

const Category = require('../../models/Category');
const Client = require('../../models/Client');
const Project = require('../../models/Project');


module.exports = router => {
    router.get('/', async (req, res) => {
        const userId = req.user.id;

        try {
            const categories = await Category.getAllFrontend(userId);
            const clients = await Client.getAllFrontendWithRelated(userId);
            const projects = await Project.getAllFrontendWithRelated(userId);

            res.json({
                categories,
                clients,
                projects
            });
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    });
};
