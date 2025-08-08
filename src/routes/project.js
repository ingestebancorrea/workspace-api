const { Router } = require("express");
const { tokenValidator } = require('../middlewares/tokenValidator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const projectController = require('../controllers/project');

const router = Router();

router.use(tokenValidator);

router.get('/', projectController.getAll);

router.get('/:id', projectController.getById);

router.post('/',
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        check('description', 'La descripción no puede exceder 5000 caracteres').optional().isLength({ max: 5000 }),
        fieldValidator
    ],
    projectController.create
);

router.put('/:id',
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty().isLength({ max: 255 }),
        check('description', 'La descripción no puede exceder 5000 caracteres').optional().isLength({ max: 5000 }),
        fieldValidator
    ],
    projectController.update
);

router.delete('/:id', projectController.remove);

module.exports = router;
