const Task = require('../models/Task');
const errorMessages = require('../common/errorMessage');

class TaskService {
    async create(data) {
        try {
            const task = await Task.create({
                project_id: data.project_id,
                title: data.title,
                description: data.description || null,
                status: data.status || 'Backlog',
                limit_date: data.limit_date || null
            });

            return {
                ok: true,
                status: 201,
                msg: 'Tarea creada correctamente',
                data: task
            };
        } catch (error) {
            console.error(error);
            return {
                ok: false,
                status: 500,
                msg: errorMessages.SERVER.GENERAL_ERROR
            };
        }
    }

    async getAll() {
        try {
            const tasks = await Task.findAll({
                order: [['created_at', 'DESC']]
            });
            return tasks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(projectId) {
        try {
            return await Task.findAll({
            where: { project_id: projectId }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const [updatedRows] = await Task.update(data, { where: { id } });
            return updatedRows > 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(id) {
        try {
            const deletedRows = await Task.destroy({ where: { id } });
            return deletedRows > 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new TaskService();
