'use strict'

var validator = require('validator');
var Foro = require('../models/foro');

var controller ={
    save: (req,res) => {
        var params = req.body;
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'

            });
        };
        if (validate_title && validate_content ) {
            var pregunta = new Foro();
            pregunta.title = params.title;
            pregunta.content = params.content;

            pregunta.save((err, preguntaStored) => {
                if(err || !preguntaStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los pregunta no se ha guardado'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    pregunta
                });
            });
        }else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'

            });
        }
    },// end save

    getForo: (req, res) => {
        Foro.find({}).exec((err, preguntas) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al mostrar preguntas'
                });
            }
            if (!preguntas) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay preguntas para mostrar !!'
                });
            }
            return res.status(200).send({
                status: 'success',
                preguntas
            });
        });
    }

};//end controller
module.exports = controller;
