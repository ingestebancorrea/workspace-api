const { response } = require('express');
const labelService = require('../services/label');
const errorMessages = require('../common/errorMessage');

class LabelController {
    async create(req, res = response) {
        try {
            const result = await labelService.create(req.body);
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
            const labels = await labelService.getAll();
            return res.json({ ok: true, data: labels });
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
            const label = await labelService.getById(req.params.id);
            if (!label) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Etiqueta no encontrada.'
                });
            }
            return res.json({ ok: true, data: label });
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
            const updated = await labelService.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Etiqueta no encontrada'
                });
            }
            return res.json({ ok: true, msg: 'Etiqueta actualizada correctamente' });
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
            const deleted = await labelService.remove(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Etiqueta no encontrada'
                });
            }
            return res.json({ ok: true, msg: 'Etiqueta eliminada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: errorMessages.SERVER.GENERAL_ERROR
            });
        }
    }
}

const labelController = new LabelController();

module.exports = {
    create: labelController.create.bind(labelController),
    getAll: labelController.getAll.bind(labelController),
    getById: labelController.getById.bind(labelController),
    update: labelController.update.bind(labelController),
    remove: labelController.remove.bind(labelController)
};
