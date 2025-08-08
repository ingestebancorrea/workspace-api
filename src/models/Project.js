const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

class ProjectModel {
    constructor() {
        this.Project = sequelize.define('Project', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            tableName: 'projects',
            timestamps: false
        });
    }
}

module.exports = new ProjectModel().Project;
