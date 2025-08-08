const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Role = require('../models/Role');

class UserModel {
    constructor() {
        this.User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_rol: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW
            }
        }, {
            tableName: 'users',
            timestamps: false
        });

        this.User.belongsTo(Role, { foreignKey: 'id_rol' });
    }
}

module.exports = new UserModel().User;