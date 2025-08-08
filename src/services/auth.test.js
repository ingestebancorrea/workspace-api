// auth.test.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const errorMessages = require('../common/errorMessage');
const AuthService = require('./auth'); // tu servicio

jest.mock('../models/User');
jest.mock('../helpers/jwt');
jest.mock('./role', () => ({
  getRoleByAlias: jest.fn(() => Promise.resolve(1))
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('createUser', () => {
    it('debe crear un usuario exitosamente', async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: 1,
        name: 'Test User',
        password: 'hashedpassword'
      });
      generateJWT.mockResolvedValue('token123');

      const result = await AuthService.createUser({
        username: 'testuser',
        password: '123456',
        name: 'Test User',
        role: 'admin'
      });

      expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    });

    it('debe devolver error si el usuario ya existe', async () => {
      User.findOne.mockResolvedValue({ id: 1 });

      const result = await AuthService.createUser({
        username: 'testuser',
        password: '123456',
        name: 'Test User',
        role: 'admin'
      });

      expect(result).toEqual({
        ok: false,
        status: 400,
        msg: 'Un usuario ya existe con ese correo'
      });
    });

    it('debe manejar error interno', async () => {
      User.findOne.mockRejectedValue(new Error('fail'));

      const result = await AuthService.createUser({
        username: 'fail',
        password: 'fail',
        name: 'fail',
        role: 'admin'
      });

      expect(result).toEqual({
        ok: false,
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('debe iniciar sesión correctamente', async () => {
      const hashedPass = bcrypt.hashSync('123456', 10);
      User.findOne.mockResolvedValue({
        id: 1,
        name: 'Test User',
        password: hashedPass
      });
      generateJWT.mockResolvedValue('token123');

      const result = await AuthService.login({ username: 'testuser', password: '123456' });

      expect(result).toEqual({
        ok: true,
        status: 200,
        data: {
          id: 1,
          name: 'Test User',
          token: 'token123'
        }
      });
    });

    it('debe devolver error por usuario no encontrado o contraseña incorrecta', async () => {
      User.findOne.mockResolvedValue(null);

      let result = await AuthService.login({ username: 'unknown', password: '123456' });
      expect(result).toEqual({
        ok: false,
        status: 400,
        msg: 'Email o contraseña incorrectos'
      });

      User.findOne.mockResolvedValue({
        id: 1,
        name: 'Test User',
        password: bcrypt.hashSync('correctpass', 10)
      });

      result = await AuthService.login({ username: 'testuser', password: 'wrongpass' });
      expect(result).toEqual({
        ok: false,
        status: 400,
        msg: 'Email o contraseña incorrectos'
      });
    });

    it('debe manejar error interno en login', async () => {
      User.findOne.mockRejectedValue(new Error('fail'));

      const result = await AuthService.login({ username: 'fail', password: 'fail' });

      expect(result).toEqual({
        ok: false,
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('revalidateToken', () => {
    it('debe revalidar token exitosamente', async () => {
      generateJWT.mockResolvedValue('newtoken123');

      const result = await AuthService.revalidateToken({ id: 1, name: 'Test User' });

      expect(result).toEqual({
        ok: true,
        status: 200,
        data: {
          id: 1,
          name: 'Test User',
          token: 'newtoken123'
        }
      });
    });

    it('debe manejar error en revalidar token', async () => {
      generateJWT.mockRejectedValue(new Error('fail'));

      const result = await AuthService.revalidateToken({ id: 1, name: 'Test User' });

      expect(result).toEqual({
        ok: false,
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getRoleById', () => {
    it('debe obtener rol por id exitosamente', async () => {
      User.findOne.mockResolvedValue({ id: 1, name: 'Test User', id_rol: 2 });

      const result = await AuthService.getRoleById(1);

      expect(result).toEqual({
        ok: true,
        status: 200,
        data: { id: 1, name: 'Test User', id_rol: 2 }
      });
    });

    it('debe devolver error si no encuentra el usuario', async () => {
      User.findOne.mockResolvedValue(null);

      const result = await AuthService.getRoleById(999);

      expect(result).toEqual({
        ok: false,
        status: 404,
        msg: 'Usuario no encontrado'
      });
    });

    it('debe manejar error interno', async () => {
      User.findOne.mockRejectedValue(new Error('fail'));

      const result = await AuthService.getRoleById(1);

      expect(result).toEqual({
        ok: false,
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      });
      expect(console.error).toHaveBeenCalled();
    });
  });
});
