const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Task = require('../models/Task');
const Label = require('../models/Label');

class TaskLabelModel {
    constructor() {
        this.TaskLabel = sequelize.define('TaskLabel', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            task_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            label_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        }, {
            tableName: 'task_labels',
            timestamps: false
        });

        this.TaskLabel.belongsTo(Task, {
            foreignKey: 'task_id',
            onDelete: 'CASCADE'
        });

        this.TaskLabel.belongsTo(Label, {
            foreignKey: 'label_id',
            onDelete: 'CASCADE'
        });
    }
}

module.exports = new TaskLabelModel().TaskLabel;
