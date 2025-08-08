const { mockRequest, mockResponse } = require('jest-mock-req-res');
const projectControllerModule = require('../controllers/project');
const projectService = require('../services/project');
const errorMessages = require('../common/errorMessage');

jest.mock('../services/project');

describe('ProjectController', () => {
  let projectController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  beforeEach(() => {
    projectController = projectControllerModule;
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe manejar error y responder status y mensaje por defecto', async () => {
      const req = mockRequest({ body: {}, id: 'user123' });
      const res = mockResponse();

      const error = { status: 400, msg: 'Error interno del servidor. Por favor, hable con el administrador.' };
      projectService.create.mockRejectedValue(error);

      await projectController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: error.msg,
      });
    });
  });

  describe('getAll', () => {
    it('debe llamar a projectService.getAll y responder con los proyectos', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const projects = [{ id: '1', name: 'Proyecto A' }, { id: '2', name: 'Proyecto B' }];
      projectService.getAll.mockResolvedValue(projects);

      await projectController.getAll(req, res);

      expect(projectService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: projects });
    });

    it('debe manejar error y responder 500 con mensaje por defecto', async () => {
      const req = mockRequest();
      const res = mockResponse();

      projectService.getAll.mockRejectedValue(new Error('Error inesperado'));

      await projectController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR,
      });
    });
  });

  describe('getById', () => {
    it('debe responder con proyecto si existe', async () => {
      const req = mockRequest({ params: { id: '123' } });
      const res = mockResponse();

      const project = { id: '123', name: 'Proyecto X' };
      projectService.getById.mockResolvedValue(project);

      await projectController.getById(req, res);

      expect(projectService.getById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: project });
    });

    it('debe responder 404 si no existe proyecto', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      projectService.getById.mockResolvedValue(null);

      await projectController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Proyecto no encontrado',
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'error' } });
      const res = mockResponse();

      projectService.getById.mockRejectedValue(new Error('Error inesperado'));

      await projectController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR,
      });
    });
  });

  describe('update', () => {
    it('debe actualizar proyecto y responder mensaje de éxito', async () => {
      const req = mockRequest({ params: { id: '123' }, body: { name: 'Nuevo nombre' } });
      const res = mockResponse();

      projectService.update.mockResolvedValue(true);

      await projectController.update(req, res);

      expect(projectService.update).toHaveBeenCalledWith('123', req.body);
      expect(res.json).toHaveBeenCalledWith({ ok: true, msg: 'Proyecto actualizado correctamente' });
    });

    it('debe responder 404 si no encontró proyecto para actualizar', async () => {
      const req = mockRequest({ params: { id: '999' }, body: {} });
      const res = mockResponse();

      projectService.update.mockResolvedValue(false);

      await projectController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Proyecto no encontrado',
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'err' }, body: {} });
      const res = mockResponse();

      projectService.update.mockRejectedValue(new Error('Error inesperado'));

      await projectController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR,
      });
    });
  });

  describe('remove', () => {
    it('debe eliminar proyecto y responder mensaje de éxito', async () => {
      const req = mockRequest({ params: { id: '123' } });
      const res = mockResponse();

      projectService.remove.mockResolvedValue(true);

      await projectController.remove(req, res);

      expect(projectService.remove).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ ok: true, msg: 'Proyecto eliminado correctamente' });
    });

    it('debe responder 404 si no encontró proyecto para eliminar', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      projectService.remove.mockResolvedValue(false);

      await projectController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Proyecto no encontrado',
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'err' } });
      const res = mockResponse();

      projectService.remove.mockRejectedValue(new Error('Error inesperado'));

      await projectController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR,
      });
    });
  });
});
