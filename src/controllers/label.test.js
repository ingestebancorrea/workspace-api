const { mockRequest, mockResponse } = require('jest-mock-req-res');
const labelControllerModule = require('../controllers/label');
const labelService = require('../services/label');
const errorMessages = require('../common/errorMessage');

jest.mock('../services/label');

describe('LabelController', () => {
  let labelController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  beforeEach(() => {
    labelController = labelControllerModule;
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe llamar a labelService.create y responder con el resultado', async () => {
      const req = mockRequest({ body: { name: 'Etiqueta1' } });
      const res = mockResponse();

      const mockResult = { status: 201, ok: true, data: { id: '123', name: 'Etiqueta1' } };
      labelService.create.mockResolvedValue(mockResult);

      await labelController.create(req, res);

      expect(labelService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(mockResult.status);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debe manejar error y responder con status y mensaje por defecto', async () => {
      const req = mockRequest({ body: {} });
      const res = mockResponse();

      const error = { status: 400, msg: 'Error de prueba' };
      labelService.create.mockRejectedValue(error);

      await labelController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: error.msg
      });
    });
  });

  describe('getAll', () => {
    it('debe llamar a labelService.getAll y responder con etiquetas', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const labels = [{ id: '1', name: 'Etiqueta A' }, { id: '2', name: 'Etiqueta B' }];
      labelService.getAll.mockResolvedValue(labels);

      await labelController.getAll(req, res);

      expect(labelService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: labels });
    });

    it('debe manejar error y responder con mensaje por defecto', async () => {
      const req = mockRequest();
      const res = mockResponse();

      labelService.getAll.mockRejectedValue(new Error('Error genérico'));

      await labelController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
    });
  });

  describe('getById', () => {
    it('debe devolver etiqueta si existe', async () => {
      const req = mockRequest({ params: { id: '123' } });
      const res = mockResponse();

      const label = { id: '123', name: 'Etiqueta X' };
      labelService.getById.mockResolvedValue(label);

      await labelController.getById(req, res);

      expect(labelService.getById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: label });
    });

    it('debe responder 404 si no existe etiqueta', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      labelService.getById.mockResolvedValue(null);

      await labelController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Etiqueta no encontrada.'
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'error' } });
      const res = mockResponse();

      labelService.getById.mockRejectedValue(new Error('Error inesperado'));

      await labelController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
    });
  });

  describe('update', () => {
    it('debe actualizar etiqueta y responder mensaje de éxito', async () => {
      const req = mockRequest({ params: { id: '123' }, body: { name: 'Nueva etiqueta' } });
      const res = mockResponse();

      labelService.update.mockResolvedValue(true);

      await labelController.update(req, res);

      expect(labelService.update).toHaveBeenCalledWith('123', req.body);
      expect(res.json).toHaveBeenCalledWith({ ok: true, msg: 'Etiqueta actualizada correctamente' });
    });

    it('debe responder 404 si no encontró etiqueta para actualizar', async () => {
      const req = mockRequest({ params: { id: '999' }, body: {} });
      const res = mockResponse();

      labelService.update.mockResolvedValue(false);

      await labelController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Etiqueta no encontrada'
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'err' }, body: {} });
      const res = mockResponse();

      labelService.update.mockRejectedValue(new Error('Error de prueba'));

      await labelController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
    });
  });

  describe('remove', () => {
    it('debe eliminar etiqueta y responder mensaje de éxito', async () => {
      const req = mockRequest({ params: { id: '123' } });
      const res = mockResponse();

      labelService.remove.mockResolvedValue(true);

      await labelController.remove(req, res);

      expect(labelService.remove).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ ok: true, msg: 'Etiqueta eliminada correctamente' });
    });

    it('debe responder 404 si no encontró etiqueta para eliminar', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      labelService.remove.mockResolvedValue(false);

      await labelController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: 'Etiqueta no encontrada'
      });
    });

    it('debe manejar error y responder 500', async () => {
      const req = mockRequest({ params: { id: 'err' } });
      const res = mockResponse();

      labelService.remove.mockRejectedValue(new Error('Error inesperado'));

      await labelController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
    });
  });
});
