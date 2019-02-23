'use strict';

class ApiControllerFactory {
    constructor(Model, getFrontendValues) {
        this.Model = Model;
        this.getFrontendValues = getFrontendValues ? getFrontendValues : values => values;
    }

    async getAll(req, res) {
        try {
            const results = await this.Model.findAll({ where: { userId: req.user.id } });
            const values = results.map(result => {
                return this.getFrontendValues(result.get());
            });
            res.json(values);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    }

    async getSingle(req, res) {
        try {
            const result = await this.Model.findOne({ where: { id: req.params.id, userId: req.user.id } });
            const values = this.getFrontendValues(result.get());
            res.json(values);
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    }

    async delete(req, res) {
        try {
            await this.Model.destroy({ where: { id: req.params.id, userId: req.user.id } });
            res.status(201).send('');
        }
        catch(error) {
            console.error(new Error(error));
            res.status(500).send('');
        }
    }
}

module.exports = ApiControllerFactory;
