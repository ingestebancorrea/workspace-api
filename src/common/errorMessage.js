// errorMessage.js

const errorMessages = {
    AUTHENTICATION: {
        NO_TOKEN: 'No hay token en la petición.',
        INVALID_TOKEN: 'Token no válido.',
        USER_NOT_FOUND: 'Usuario no encontrado.',
    },
    VALIDATION: {
        REQUIRED_FIELD: (field) => `${field} es obligatorio.`,
        INVALID_TYPE: (field) => `El tipo de ${field} no es válido.`,
        MAX_LENGTH: (field, max) => `${field} no puede exceder ${max} caracteres.`,
    },
    DATABASE: {
        CONNECTION_FAILED: 'Error al conectar a la base de datos.',
        RECORD_NOT_FOUND: 'Registro no encontrado.',
        UNIQUE_VIOLATION: 'Este registro ya existe.',
    },
    SERVER: {
        GENERAL_ERROR: 'Error interno del servidor. Por favor, hable con el administrador.',
    },
};

module.exports = errorMessages;