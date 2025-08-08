// label.test.js

const Label = require('../models/label');
const errorMessages = require('../common/errorMessage');
const LabelService = require('./label');

jest.mock('../models/label');

describe('LabelService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('create', () => {
    it('debe crear una etiqueta correctamente', async () => {
      const labelData = { name: 'Test Label' };
      const createdLabel = { id: 1, name: 'Test Label' };

      Label.create.mockResolvedValue(createdLabel);

      const result = await LabelService.create(labelData);

      expect(Label.create).toHaveBeenCalledWith(labelData);
      expect(result).toEqual({ status: 201, ok: true, data: createdLabel });
    });

    it('debe lanzar error si falla la creación', async () => {
      Label.create.mockRejectedValue(new Error('fail'));

      await expect(LabelService.create({ name: 'fail' })).rejects.toEqual({
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('debe retornar todas las etiquetas', async () => {
      const labels = [{ id: 1 }, { id: 2 }];
      Label.findAll.mockResolvedValue(labels);

      const result = await LabelService.getAll();

      expect(Label.findAll).toHaveBeenCalled();
      expect(result).toEqual(labels);
    });

    it('debe lanzar error si falla la consulta', async () => {
      Label.findAll.mockRejectedValue(new Error('fail'));

      await expect(LabelService.getAll()).rejects.toEqual({
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('debe retornar etiqueta por id', async () => {
      const label = { id: 1, name: 'Label1' };
      Label.findByPk.mockResolvedValue(label);

      const result = await LabelService.getById(1);

      expect(Label.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(label);
    });

    it('debe lanzar error si falla la consulta por id', async () => {
      Label.findByPk.mockRejectedValue(new Error('fail'));

      await expect(LabelService.getById(1)).rejects.toEqual({
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('debe actualizar etiqueta correctamente', async () => {
      const label = {
        update: jest.fn().mockResolvedValue(),
      };
      Label.findByPk.mockResolvedValue(label);

      const dataToUpdate = { name: 'Updated Label' };
      const result = await LabelService.update(1, dataToUpdate);

      expect(Label.findByPk).toHaveBeenCalledWith(1);
      expect(label.update).toHaveBeenCalledWith(dataToUpdate);
      expect(result).toBe(label);
    });

    it('debe retornar null si etiqueta no existe', async () => {
      Label.findByPk.mockResolvedValue(null);

      const result = await LabelService.update(999, { name: 'x' });
      expect(result).toBeNull();
    });

    it('debe lanzar error si falla la actualización', async () => {
      Label.findByPk.mockRejectedValue(new Error('fail'));

      await expect(LabelService.update(1, { name: 'x' })).rejects.toEqual({
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('debe eliminar etiqueta correctamente', async () => {
      const label = {
        destroy: jest.fn().mockResolvedValue(),
      };
      Label.findByPk.mockResolvedValue(label);

      const result = await LabelService.remove(1);

      expect(Label.findByPk).toHaveBeenCalledWith(1);
      expect(label.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('debe retornar null si etiqueta no existe para eliminar', async () => {
      Label.findByPk.mockResolvedValue(null);

      const result = await LabelService.remove(999);
      expect(result).toBeNull();
    });

    it('debe lanzar error si falla la eliminación', async () => {
      Label.findByPk.mockRejectedValue(new Error('fail'));

      await expect(LabelService.remove(1)).rejects.toEqual({
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });
});
