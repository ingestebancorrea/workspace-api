const { response } = require('express');
const AuthService = require('../services/auth'); 

class AuthController {
  async createUser(req, res = response) {
    const result = await AuthService.createUser(req.body);
    return res.status(result.status).json(result);
  }

  async login(req, res = response) {
    const result = await AuthService.login(req.body);
    return res.status(result.status).json(result);
  }

  async revalidateToken(req, res = response) {
    const { id, name } = req;
    const result = await AuthService.revalidateToken({ id, name });
    return res.status(result.status).json(result);
  }

  async getRoleById(req, res = response) {
    const { userId } = req.params;
    const result = await AuthService.getRoleById(userId);
    return res.status(result.status).json(result);
  }
}

const authController = new AuthController();

module.exports = {
  createUser: authController.createUser.bind(authController),
  login: authController.login.bind(authController),
  revalidateToken: authController.revalidateToken.bind(authController),
  getRoleById: authController.getRoleById.bind(authController)
};
