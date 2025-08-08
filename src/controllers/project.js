const { response } = require('express');
const projectService = require('../services/project');
const errorMessages = require('../common/errorMessage');

class ProjectController { 
    async create(req, res = response) {
        try {
            const data = req.body;
            const userId = req.id;

            const result = await projectService.create(data, userId);

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
            const projects = await projectService.getAll();
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
            const project = await projectService.getById(req.params.id);
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Proyecto no encontrado'
                });
            }
            return res.json({ ok: true, data: project });
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
            const updated = await projectService.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Proyecto no encontrado'
                });
            }
            return res.json({ ok: true, msg: 'Proyecto actualizado correctamente' });
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
            const deleted = await projectService.remove(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Proyecto no encontrado'
                });
            }
            return res.json({ ok: true, msg: 'Proyecto eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }
}

const projectController = new ProjectController();

module.exports = {
    create: projectController.create.bind(projectController),
    getAll: projectController.getAll.bind(projectController),
    getById: projectController.getById.bind(projectController),
    update: projectController.update.bind(projectController),
    remove: projectController.remove.bind(projectController)
};
