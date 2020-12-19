const {Label} = require('../models');

module.exports = {
    findAll: async (request, response) => {
        const labels = await Label.findAll();
        response.json(labels);
    },

    findOne: async (request, response) => {
        const labelId = parseInt(request.params.id);
        const label = await Label.findByPk(labelId);
        if (label)
            return response.json(label);
        response.status(404).json({error: 'Label not found'});
    },

    create: async (request, response) => {
        const label = await Label.create(request.body);
        response.json(label);
    },

    update: async (request, response) => {
        const labelId = parseInt(request.params.id);
        const label = await Label.findByPk(labelId);
        if (label) {
            await label.update(request.body);
            return response.json(label);
        }
        response.status(404).json({error: 'Label not found'});
    },

    delete: async (request, response) => {
        const labelId = parseInt(request.params.id);
        const result = await Label.destroy({
            where: {
                id: labelId
            }
        });
        if (result)
            return response.json({message: 'ok'});
        response.status(404).json({error: 'Label not found'});
    },

    updateAll: async (request, response) => {
        const [nb, labels] = await Label.update(request.body, {
            where: {},
            returning: true
        });
        if (nb)
            return response.json(labels);
        response.status(400).json({error: 'Error during update'});
    },

    deleteAll: async (request, response) => {
        const nb = await Label.destroy({
            where: {}
        });
        if (nb)
            return response.json({message: 'ok'});
        response.status(400).json({error: 'Error during delete'});
    }
}