const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const errorMessages = require('../common/errorMessage');
const { getRoleByAlias } = require('./role');

class AuthService {
  async createUser({ username, password, name, role }) {
    try {
      let user = await User.findOne({ where: { username } });

      if (user) {
        return {
          ok: false,
          status: 400,
          msg: 'Un usuario ya existe con ese correo'
        };
      }

      const idRole = await getRoleByAlias(role);

      user = await User.create({
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        name,
        id_rol: idRole
      });

      const token = await generateJWT(user.id, user.name);

      return {
        ok: true,
        status: 201,
        data: {
          id: user.id,
          name: user.name,
          token
        },
        msg: "Usuario registrado exitosamente."
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

  async login({ username, password }) {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return {
          ok: false,
          status: 400,
          msg: 'Email o contraseña incorrectos'
        };
      }

      const token = await generateJWT(user.id, user.name);

      return {
        ok: true,
        status: 200,
        data: {
          id: user.id,
          name: user.name,
          token
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

  async revalidateToken({ id, name }) {
    try {
      const token = await generateJWT(id, name);

      return {
        ok: true,
        status: 200,
        data: {
          id,
          name,
          token
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

  async getRoleById(userId) {
    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return {
          ok: false,
          status: 404,
          msg: 'Usuario no encontrado'
        };
      }

      return {
        ok: true,
        status: 200,
        data: user
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

module.exports = new AuthService();
