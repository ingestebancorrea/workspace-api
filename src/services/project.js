const Project = require('../models/Project');
const User = require('../models/User');
const Role = require('../models/Role');

class ProjectService {
    async create(data, userId) {
        const user = await User.findByPk(userId, {
            include: [{ model: Role, attributes: ['name', 'alias'] }]
        });

        if (!user || user.Role.alias !== 'POW') throw { status: 403, msg: 'No autorizado para crear proyectos' };

        const project = await Project.create({
            name: data.name,
            description: data.description
        });

        return {
            ok: true,
            status: 201,
            data: {
                id: project.id,
                name: project.name,
                description: project.description,
                created_at: project.created_at,
                updated_at: project.updated_at
            },
            msg: "Proyecto registrado exitosamente."
        };
    }

    async getAll() {
        return await Project.findAll();
    }

    async getById(id) {
        return await Project.findByPk(id);
    }

    async update(id, data) {
        const project = await Project.findByPk(id);
        if (!project) return null;

        await project.update({
            name: data.name,
            description: data.description,
            updated_at: new Date()
        });
        return true;
    }

    async remove(id) {
        const project = await Project.findByPk(id);
        if (!project) return null;

        await project.destroy();
        return true;
    }
}

module.exports = new ProjectService();
