const { response } = require('express');
const RoleService = require('../services/role');

class RoleController {

  async getRoleByAlias(req, res = response) {
    const { alias } = req.params;
    const result = await RoleService.getRoleByAlias(alias);
    return res.status(result.status).json(result);
  }
}

const roleController = new RoleController();

module.exports = {
  getRoleByAlias: roleController.getRoleByAlias.bind(roleController)
};
