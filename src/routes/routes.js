const {Router} = require('express');
const router = Router();

const {getRecetas,postRecetas} = require('../controllers/receta.controller');

// const {updateItem} = require('../controllers/search.controller');

//  BUSQUEDA
router.route('/recetas')
    .get(getRecetas)
    .post(postRecetas)


module.exports = router;