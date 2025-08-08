const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    alias: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;