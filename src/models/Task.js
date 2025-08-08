const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Project = require('../models/Project');

class TaskModel {
    constructor() {
        this.Task = sequelize.define('Task', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            project_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            limit_date: {
                type: DataTypes.DATEONLY,
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
            tableName: 'tasks',
            timestamps: false
        });

        this.Task.belongsTo(Project, { foreignKey: 'project_id' });
    }
}

module.exports = new TaskModel().Task;
