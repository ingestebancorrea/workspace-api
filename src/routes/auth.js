/* 
 Rutas de Usuarios/Auth 
 host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { fieldValidator }  = require('../middlewares/fieldValidator');
const { createUser, login, revalidateToken } = require('../controllers/auth');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post(
    '/register',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').isEmail(),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
        check('role', 'El rol es obligatorio y debe ser un string').not().isEmpty().isString(),
        fieldValidator
    ],
    createUser
);

router.post(
    '/login', 
    [ // middlewares
        check('username', 'El username es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    login
);

router.get('/renew', tokenValidator, revalidateToken);

module.exports = router;