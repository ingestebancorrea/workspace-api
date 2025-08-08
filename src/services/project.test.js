const ProjectService = require('./project');

jest.mock('../models/User', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../models/Role', () => ({}));
jest.mock('../models/Project', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

const User = require('../models/User');
const Project = require('../models/Project');

describe('ProjectService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear un proyecto si el usuario es POW', async () => {
      User.findByPk.mockResolvedValue({
        Role: { alias: 'POW' },
      });

      const fakeProject = {
        id: 1,
        name: 'Proyecto Test',
        description: 'Descripción',
        created_at: new Date(),
        updated_at: new Date(),
      };

      Project.create.mockResolvedValue(fakeProject);

      const data = { name: 'Proyecto Test', description: 'Descripción' };
      const userId = 123;

      const result = await ProjectService.create(data, userId);

      expect(User.findByPk).toHaveBeenCalledWith(userId, {
        include: [{ model: expect.anything(), attributes: ['name', 'alias'] }],
      });
      expect(Project.create).toHaveBeenCalledWith({
        name: data.name,
        description: data.description,
      });

      expect(result).toEqual({
        ok: true,
        status: 201,
        data: {
          id: fakeProject.id,
          name: fakeProject.name,
          description: fakeProject.description,
          created_at: fakeProject.created_at,
          updated_at: fakeProject.updated_at,
        },
        msg: "Proyecto registrado exitosamente.",
      });
    });

    it('debería lanzar error 403 si el usuario no es POW', async () => {
      User.findByPk.mockResolvedValue({
        Role: { alias: 'OTHER' },
      });

      await expect(ProjectService.create({ name: 'X', description: 'Y' }, 1))
        .rejects.toMatchObject({ status: 403, msg: 'No autorizado para crear proyectos' });
    });

    it('debería lanzar error 403 si no encuentra usuario', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(ProjectService.create({ name: 'X', description: 'Y' }, 1))
        .rejects.toMatchObject({ status: 403, msg: 'No autorizado para crear proyectos' });
    });
  });

  describe('getAll', () => {
    it('debería devolver lista de proyectos', async () => {
      const projects = [{ id: 1 }, { id: 2 }];
      Project.findAll.mockResolvedValue(projects);

      const result = await ProjectService.getAll();

      expect(Project.findAll).toHaveBeenCalled();
      expect(result).toBe(projects);
    });
  });

  describe('getById', () => {
    it('debería devolver un proyecto por id', async () => {
      const project = { id: 1, name: 'P1' };
      Project.findByPk.mockResolvedValue(project);

      const result = await ProjectService.getById(1);

      expect(Project.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe(project);
    });
  });

  describe('update', () => {
    it('debería actualizar proyecto si existe', async () => {
      const mockUpdate = jest.fn();
      const project = { update: mockUpdate };
      Project.findByPk.mockResolvedValue(project);

      const data = { name: 'Nuevo', description: 'Desc' };

      const result = await ProjectService.update(1, data);

      expect(Project.findByPk).toHaveBeenCalledWith(1);
      expect(mockUpdate).toHaveBeenCalledWith({
        name: data.name,
        description: data.description,
        updated_at: expect.any(Date),
      });
      expect(result).toBe(true);
    });

    it('debería devolver null si no existe proyecto', async () => {
      Project.findByPk.mockResolvedValue(null);

      const result = await ProjectService.update(1, {});

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('debería eliminar proyecto si existe', async () => {
      const mockDestroy = jest.fn();
      const project = { destroy: mockDestroy };
      Project.findByPk.mockResolvedValue(project);

      const result = await ProjectService.remove(1);

      expect(Project.findByPk).toHaveBeenCalledWith(1);
      expect(mockDestroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('debería devolver null si no existe proyecto', async () => {
      Project.findByPk.mockResolvedValue(null);

      const result = await ProjectService.remove(1);

      expect(result).toBeNull();
    });
  });
});
