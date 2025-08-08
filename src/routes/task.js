const { Router } = require("express");
const { tokenValidator } = require('../middlewares/tokenValidator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const taskController = require('../controllers/task');

const router = Router();

router.use(tokenValidator);

router.get('/', taskController.getAll);

router.get('/:id', taskController.getById);

router.post('/',
    [
        check('project_id', 'El ID del proyecto es obligatorio').isInt(),
        check('title', 'El título de la tarea es obligatorio').not().isEmpty().isLength({ max: 255 }),
        check('description', 'La descripción no puede exceder 5000 caracteres').optional().isLength({ max: 5000 }),
        check('status', 'El estado de la tarea es obligatorio').not().isEmpty().isLength({ max: 50 }),
        check('limit_date', 'La fecha límite debe tener el formato YYYY-MM-DD').optional().isDate(),
        fieldValidator
    ],
    taskController.create
);

router.put('/:id',
    [
        check('project_id', 'El ID del proyecto debe ser un número').optional().isInt(),
        check('title', 'El título no puede exceder 255 caracteres').optional().isLength({ max: 255 }),
        check('description', 'La descripción no puede exceder 5000 caracteres').optional().isLength({ max: 5000 }),
        check('status', 'El estado no puede exceder 50 caracteres').optional().isLength({ max: 50 }),
        check('limit_date', 'La fecha límite debe tener el formato YYYY-MM-DD').optional().isDate(),
        fieldValidator
    ],
    taskController.update
);

router.delete('/:id', taskController.remove);

module.exports = router;
