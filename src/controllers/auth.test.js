const { createRequest, createResponse } = require('jest-mock-req-res');
const { AuthController } = require('../controllers/auth');
const AuthService = require('../services/auth');

jest.mock('../services/auth');

describe('AuthController', () => {
  let authController;

  beforeEach(() => {
    authController = new AuthController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('debe llamar a AuthService.createUser y responder con el resultado', async () => {
      const req = createRequest({ body: { username: 'test', password: '1234' } });
      const res = createResponse();

      const mockResult = { status: 201, message: 'User created' };
      AuthService.createUser.mockResolvedValue(mockResult);

      await authController.createUser(req, res);

      expect(AuthService.createUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(mockResult.status);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('login', () => {
    it('debe llamar a AuthService.login y responder con el resultado', async () => {
      const req = createRequest({ body: { username: 'test', password: '1234' } });
      const res = createResponse();

      const mockResult = { status: 200, token: 'abc123' };
      AuthService.login.mockResolvedValue(mockResult);

      await authController.login(req, res);

      expect(AuthService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(mockResult.status);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('revalidateToken', () => {
    it('debe llamar a AuthService.revalidateToken y responder con el resultado', async () => {
      const req = createRequest();
      req.id = 'user123';
      req.name = 'Test User';
      const res = createResponse();

      const mockResult = { status: 200, token: 'newToken' };
      AuthService.revalidateToken.mockResolvedValue(mockResult);

      await authController.revalidateToken(req, res);

      expect(AuthService.revalidateToken).toHaveBeenCalledWith({ id: req.id, name: req.name });
      expect(res.status).toHaveBeenCalledWith(mockResult.status);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('getRoleById', () => {
    it('debe llamar a AuthService.getRoleById y responder con el resultado', async () => {
      const req = createRequest({ params: { userId: 'user123' } });
      const res = createResponse();

      const mockResult = { status: 200, role: 'admin' };
      AuthService.getRoleById.mockResolvedValue(mockResult);

      await authController.getRoleById(req, res);

      expect(AuthService.getRoleById).toHaveBeenCalledWith(req.params.userId);
      expect(res.status).toHaveBeenCalledWith(mockResult.status);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });
});
