const express = require('express');

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const labelController = require('./controllers/labelController');
const associationController = require('./controllers/associationController');

const handleError = func => {
    return async (request, response, next) => {
        try {
            await func(request, response, next);
        } catch (error) {
            response.status(500).json({error});
        }
    }
};

const router = express.Router();

router.get('/list', handleError(listController.findAll));
router.get('/list/:id', handleError(listController.findOne));
router.post('/list', handleError(listController.create));
router.patch('/list/:id', handleError(listController.update));
router.delete('/list/:id', handleError(listController.delete));
router.patch('/list', handleError(listController.updateAll));
router.delete('/list', handleError(listController.deleteAll));

router.get('/card', handleError(cardController.findAll));
router.get('/card/:id', handleError(cardController.findOne));
router.post('/card', handleError(cardController.create));
router.patch('/card/:id', handleError(cardController.update));
router.delete('/card/:id', handleError(cardController.delete));
router.patch('/card', handleError(cardController.updateAll));
router.delete('/card', handleError(cardController.deleteAll));

router.get('/label', handleError(labelController.findAll));
router.get('/label/:id', handleError(labelController.findOne));
router.post('/label', handleError(labelController.create));
router.patch('/label/:id', handleError(labelController.update));
router.delete('/label/:id', handleError(labelController.delete));
router.patch('/label', handleError(labelController.updateAll));
router.delete('/label', handleError(labelController.deleteAll));

router.post('/card/:cardId/label/:labelId', handleError(associationController.associate));
router.delete('/card/:cardId/label/:labelId', handleError(associationController.dissociate));

module.exports = router;