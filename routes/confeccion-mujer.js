'use strict'

var express = require('express');
var confeccionController = require('../controllers/confeccion-mujer');
var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadh = multipart({uploadDir: './upload/medidasMujer'});

router.post('/subirMedidasMujer',confeccionController.save);
router.get('/medidasMujer',confeccionController.getMedidas);
router.get('/medidaMujer/:id',confeccionController.getConfeccionEspecifico);
router.put('/actualizarMedidasMujer/:id',confeccionController.updateConfeccion);
router.post('/upload-imageMujer/:id?',md_uploadh,confeccionController.uploadMedidas);
router.get('/get-imageMujer/:image',confeccionController.getImageMujer);

module.exports = router;
