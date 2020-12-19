const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class List extends Model {}

List.init({
    title: DataTypes.TEXT,
    position: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 0
        }
    }
}, {
    sequelize,
    tableName: 'list'
});

module.exports = List;