const errorMessages = require("../common/errorMessage");
const Role = require("../models/Role");

class RoleService {
  async getRoleByAlias(alias) {
    try {
      const role = await Role.findOne({
        where: { alias },
        attributes: ['id']
      });
      console.log("role:", role);
      if (!role) {
        return {
          ok: false,
          status: 404,
          msg: 'Role not found'
        };
      }

      return {
        ok: true,
        status: 200,
        data: {
          id: role.dataValues.id
        }
      };

    } catch (error) {
      console.error(error);
      return {
        ok: false,
        status: 500,
        msg: errorMessages.SERVER.GENERAL_ERROR
      };
    }
  }
}

module.exports = new RoleService();
