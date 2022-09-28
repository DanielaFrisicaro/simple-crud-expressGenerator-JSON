//require
const express = require('express');
const router = express.Router();
const path = require('path');

//llamo al controlador
const productsController= require('../controllers/productsController');


//PRUEBA SIN CONTROLLER............................................................................................//

/*router.get('/', function(req, res, next) {
  res.send('prueba de ruteador en products');//SEND
});*/

/*
router.get('/create', function(req, res, next) {
  res.send('prueba de vista de create');//SEND
});

router.get('/', function(req, res, next) {
  res.render('products', { title: 'Food' });//RENDER
});
*/

router.get('/', productsController.list);
router.get('/:id/detail', productsController.productDetail);
router.get('/create', productsController.crearProduct);
router.post('/create', productsController.postProduct);
router.get('/:id/editar', productsController.editarProduct);
router.put('/:id/editar', productsController.putProduct);
router.get('/:id/delete', productsController.eliminarProduct);
router.delete('/:id/delete', productsController.deleteProduct);

module.exports = router;

