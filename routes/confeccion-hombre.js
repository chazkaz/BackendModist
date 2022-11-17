'use strict'
 
var express = require('express');
var confeccionController = require('../controllers/confeccion-hombre');
var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadh = multipart({uploadDir: './upload/medidasHombre'});



router.post('/subirMedidasHombre',confeccionController.save);
router.get('/medidasHombre',confeccionController.getMedidas);
router.get('/medidaHombre/:id',confeccionController.getConfeccionEspecifico);
router.put('/actualizarMedidasHombre/:id',confeccionController.updateConfeccion);
router.post('/upload-imageHombre/:id?',md_uploadh,confeccionController.uploadMedidas);
router.get('/get-imageHombre/:image',confeccionController.getImageHombre);
module.exports = router;