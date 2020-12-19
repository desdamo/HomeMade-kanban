const {List} = require('../models');

module.exports = {
    findAll: async (request, response) => {
        const lists = await List.findAll({
            include: {
                association: 'cards',
                include: 'labels'
            },
            order: [
                ['position', 'ASC'],
                ['cards', 'position', 'ASC']
            ]
        });
        response.json(lists);
    },

    findOne: async (request, response) => {
        const listId = parseInt(request.params.id);
        const list = await List.findByPk(listId, {
            include: {
                association: 'cards',
                include: 'labels'
            }
        });
        if (list)
            return response.json(list);
        response.status(404).json({error: 'List not found'});
    },

    create: async (request, response) => {
        const list = await List.create(request.body);
        response.json(list);
    },

    update: async (request, response) => {
        const listId = parseInt(request.params.id);
        const list = await List.findByPk(listId);
        if (list) {
            await list.update(request.body);
            return response.json(list);
        }
        response.status(404).json({error: 'List not found'});
    },

    delete: async (request, response) => {
        const listId = parseInt(request.params.id);
        const result = await List.destroy({
            where: {
                id: listId
            }
        });
        if (result)
            return response.json({message: 'ok'});
        response.status(404).json({error: 'List not found'});
    },

    updateAll: async (request, response) => {
        const [nb, lists] = await List.update(request.body, {
            where: {},
            returning: true
        });
        if (nb)
            return response.json(lists);
        response.status(400).json({error: 'Error during update'});
    },

    deleteAll: async (request, response) => {
        const nb = await List.destroy({
            where: {}
        });
        if (nb)
            return response.json({message: 'ok'});
        response.status(400).json({error: 'Error during delete'});
    }
}
