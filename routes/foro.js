'use strict'

var express = require('express');
var ForoController = require('../controllers/foro');
var router = express.Router();

router.post('/subirPregunta',ForoController.save);
router.get('/mostrarPreguntas',ForoController.getForo);

module.exports = router;