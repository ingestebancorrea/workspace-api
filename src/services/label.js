const Label = require('../models/label');
const errorMessages = require('../common/errorMessage');

class LabelService {
    async create(data) {
        try {
            const label = await Label.create(data);
            return { status: 201, ok: true, data: label };
        } catch (error) {
            console.error(error);
            throw { status: 500, msg: errorMessages.SERVER.GENERAL_ERROR };
        }
    }

    async getAll() {
        try {
            return await Label.findAll();
        } catch (error) {
            console.error(error);
            throw { status: 500, msg: errorMessages.SERVER.GENERAL_ERROR };
        }
    }

    async getById(id) {
        try {
            return await Label.findByPk(id);
        } catch (error) {
            console.error(error);
            throw { status: 500, msg: errorMessages.SERVER.GENERAL_ERROR };
        }
    }

    async update(id, data) {
        try {
            const label = await Label.findByPk(id);
            if (!label) return null;

            await label.update(data);
            return label;
        } catch (error) {
            console.error(error);
            throw { status: 500, msg: errorMessages.SERVER.GENERAL_ERROR };
        }
    }

    async remove(id) {
        try {
            const label = await Label.findByPk(id);
            if (!label) return null;

            await label.destroy();
            return true;
        } catch (error) {
            console.error(error);
            throw { status: 500, msg: errorMessages.SERVER.GENERAL_ERROR };
        }
    }
}

module.exports = new LabelService();
