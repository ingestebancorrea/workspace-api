const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

class LabelModel {
    constructor() {
        this.Label = sequelize.define('Label', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            color: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        }, {
            tableName: 'labels',
            timestamps: false
        });
    }
}

module.exports = new LabelModel().Label;
