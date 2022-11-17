'use strict'
 
var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/productos'})

router.post('/save',ProductoController.save);
router.get('/productos',ProductoController.getProductos);
router.get('/producto/:id',ProductoController.getProductoEspecifico);
router.put('/producto/:id',ProductoController.update);
router.post('/upload-image/:id?',md_upload,ProductoController.upload);
router.get('/get-image/:image',ProductoController.getImage);
router.get('/search/:search',ProductoController.search);


module.exports = router;