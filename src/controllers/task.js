const { response } = require('express');
const taskService = require('../services/task');
const errorMessages = require('../common/errorMessage');

class TaskController {
    async create(req, res = response) {
        try {
            const result = await taskService.create(req.body);

            return res.status(result.status).json(result);
        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.msg || errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }

    async getAll(req, res = response) {
        try {
            const projects = await taskService.getAll();
            return res.json({ ok: true, data: projects });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }

    async getById(req, res = response) {
        try {
            const projectId = req.params.idProject;
            const tasks = await taskService.getByProjectId(projectId);

            if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron tareas para este proyecto.'
            });
            }

            return res.json({ ok: true, data: tasks });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
        }

    async update(req, res = response) {
        try {
            const updated = await taskService.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Tarea no encontrada'
                });
            }
            return res.json({ ok: true, msg: 'Tarea actualizada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }

    async remove(req, res = response) {
        try {
            const deleted = await taskService.remove(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Tarea no encontrada'
                });
            }
            return res.json({ ok: true, msg: 'Tarea eliminada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }
}

const taskController = new TaskController();

module.exports = {
    create: taskController.create.bind(taskController),
    getAll: taskController.getAll.bind(taskController),
    getById: taskController.getById.bind(taskController),
    update: taskController.update.bind(taskController),
    remove: taskController.remove.bind(taskController)
};
