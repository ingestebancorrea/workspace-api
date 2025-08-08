const { Router } = require("express");
const { tokenValidator } = require('../middlewares/tokenValidator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const labelController = require('../controllers/label');

const router = Router();

router.use(tokenValidator);

router.get('/', labelController.getAll);

router.get('/:id', labelController.getById);

router.post('/',
    [
        check('name', 'El nombre de la etiqueta es obligatorio').not().isEmpty().isLength({ max: 255 }),
        check('color', 'El color es obligatorio').not().isEmpty().isLength({ max: 50 }),
        fieldValidator
    ],
    labelController.create
);

router.put('/:id',
    [
        check('name', 'El nombre de la etiqueta es obligatorio').not().isEmpty().isLength({ max: 255 }),
        check('color', 'El color es obligatorio').not().isEmpty().isLength({ max: 50 }),
        fieldValidator
    ],
    labelController.update
);

router.delete('/:id', labelController.remove);

module.exports = router;
