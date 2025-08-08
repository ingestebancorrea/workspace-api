const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Project = require('../models/Project');
const User = require('../models/User');

class ProjectUserModel {
    constructor() {
        this.ProjectUser = sequelize.define('ProjectUser', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            project_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            joined_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            tableName: 'project_users',
            timestamps: false
        });

        this.ProjectUser.belongsTo(Project, { foreignKey: 'project_id' });

        this.ProjectUser.belongsTo(User, { foreignKey: 'user_id' });
    }
}

module.exports = new ProjectUserModel().ProjectUser;
