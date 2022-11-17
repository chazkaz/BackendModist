'use strict'

var validator = require('validator');
var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'hola mundo'
        });
    },
    datosProducto: (req, res) => {
        var hola = req.body.hola;
        return res.status(200).send({
            title: 'HOLa',
            content: 'mundo lindo',
            url: 'fff',
            hola
        });

    },
    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;

        //Validar datos(validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_price = !validator.isEmpty(params.price);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'

            });
        };
        if (validate_title && validate_content && validate_price) {
            //crear el objeto a guardar
            var producto = new Producto();
            //asignar valores
            producto.title = params.title;
            producto.content = params.content;
            producto.price = params.price;
            if(params.image){
                producto.image = params.image;
            }else{
                producto.image = null;
            }
            //Guardar los productos
            producto.save((err, productoStored) => {
                if (err || !productoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los productos no se ha guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    producto
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'

            });
        }
    },
    getProductos: (req, res) => {
        //Find 
        Producto.find({}).exec((err, productos) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al devolver los productos'
                });
            }
            if (!productos) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay productos para mostrar !!'
                });
            }
            return res.status(200).send({
                status: 'success',
                productos
            });

        });
    },
    getProductoEspecifico: (req, res) => {
        //tomar el id de la url
        var productoId = req.params.id;

        //comprobar que existe
        if (!productoId || productoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el producto'
            });
        }
        //Buscar el producto
        Producto.findById(productoId, (err, producto) => {
            if (err || !producto) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el producto'
                });
            }
            //devolverlo en json
            return res.status(404).send({
                status: 'success',
                producto
            });
        });
    },
    update: (req, res) => {
        //Tomar el id del producto por la url
        var productoId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_price = !validator.isEmpty(params.price);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar '
            });
        }
        if (validate_title && validate_content && validate_price) {
            //Find and update
            Producto.findOneAndUpdate({ _id: productoId }, params, { new: true }, (err, productoUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });
                }
                if (!productoUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el producto'
                    });
                }
                return res.status(500).send({
                    status: 'success',
                    producto: productoUpdate
                });
            });
        } else {
            //devolver respuesta   
        }
    },
    upload: (req, res) => {
        //tomar el fichero de la peticion
        var fileName = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: fileName
            });
        }
        //Conseguir nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Nombre del archivo
        var file_name = file_split[2];

        //Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //Comprobar la extension, solo imagenes,si es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            });

        } else {
            //Si todo el valido, sacando id de la url
            var productoId = req.params.id;
            if(productoId){
                // Buscar el Producto, asignarle el nombre de la imagen y actualizarlo
                Producto.findOneAndUpdate({ _id: productoId }, { image: file_name }, { new: true }, (err, productoUpdate) => {
                    if (err || !productoUpdate) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        producto: productoUpdate
                    });
                });
            }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                })
            }
        }

    

    },//end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/productos/' + file;
        fs.exists(path_file, (exists) => {
            console.log(exists);
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'LA IMAGEN NO EXIXSTE'
                });
            }
        });


    },
    search: (req, res) => {
        //Sacar el string a buscar 
        var searchString = req.params.search;

        //Find or
        Producto.find({
            "&or": [
                { "title": { "$regex": searchString, "$options": "i" } }

            ]
        })

        return res.status(404).send({
            status: 'error',
            message: 'LA IMAGEN NO EXIXSTE',
            searchString
        });
    }
}; //end controller

module.exports = controller;