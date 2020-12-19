const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Card extends Model {}

Card.init({
    title: DataTypes.TEXT,
    position: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 0
        }
    },
    color: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'card'
});

module.exports = Card;