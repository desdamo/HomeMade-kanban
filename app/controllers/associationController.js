const {Card, Label} = require('../models');

module.exports = {
    associate: async (request, response) => {
        const {labelId, cardId} = request.params;
        const card = await Card.findByPk(parseInt(cardId));
        const label = await Label.findByPk(parseInt(labelId));
        if (card && label) {
            await card.addLabel(label);
            await card.reload({
                include: 'labels'
            });
            return response.json(card);
        }
        response.status(404).json({error: 'Card or label not found'});
    },

    dissociate: async (request, response) => {
        const {labelId, cardId} = request.params;
        const card = await Card.findByPk(parseInt(cardId));
        const label = await Label.findByPk(parseInt(labelId));
        if (card && label) {
            await card.removeLabel(label);
            await card.reload({
                include: 'labels'
            });
            return response.json(card);
        }
        response.status(404).json({error: 'Card or label not found'});
    }
}