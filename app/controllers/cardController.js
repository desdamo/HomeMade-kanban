const {Card} = require('../models');

module.exports = {
    findAll: async (request, response) => {
        const cards = await Card.findAll({
            include: 'labels'
        });
        response.json(cards);
    },

    findOne: async (request, response) => {
        const cardId = parseInt(request.params.id);
        const card = await Card.findByPk(cardId, {
            include: 'labels'
        });
        if (card)
            return response.json(card);
        response.status(404).json({error: 'Card not found'});
    },

    create: async (request, response) => {
        const card = await Card.create(request.body);
        response.json(card);
    },

    update: async (request, response) => {
        const cardId = parseInt(request.params.id);
        const card = await Card.findByPk(cardId);
        if (card) {
            await card.update(request.body);
            return response.json(card);
        }
        response.status(404).json({error: 'Card not found'});
    },

    delete: async (request, response) => {
        const cardId = parseInt(request.params.id);
        const result = await Card.destroy({
            where: {
                id: cardId
            }
        });
        if (result)
            return response.json({message: 'ok'});
        response.status(404).json({error: 'Card not found'});
    },

    updateAll: async (request, response) => {
        const [nb, cards] = await Card.update(request.body, {
            where: {},
            returning: true
        });
        if (nb)
            return response.json(cards);
        response.status(400).json({error: 'Error during update'});
    },

    deleteAll: async (request, response) => {
        const nb = await Card.destroy({
            where: {}
        });
        if (nb)
            return response.json({message: 'ok'});
        response.status(400).json({error: 'Error during delete'});
    }
}
