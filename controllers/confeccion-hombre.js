//var path = require('path');
var confeccionHombre = require('../models/confeccion-hombre');
var fs = require('fs');
path = require('path');

var controller = {
   
    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;

            //crear el objeto a guardar
            var confeccion = new confeccionHombre();
            //asignar valores
            confeccion.cuello = params.cuello;
            confeccion.pecho = params.pecho;
            confeccion.manga = params.manga;
            confeccion.cintura = params.cintura;
            confeccion.cadera = params.cadera;
            confeccion.pantorrilla = params.pantorrilla;
            confeccion.entrepierna = params.entrepierna;
            confeccion.pierna = params.pierna;
            if(params.image){
                confeccion.image= params.image
            }else{
                confeccion.image = null;
            }           

            //Guardar los productos
            confeccion.save((err, confeccionStored) => {
                if (err || !confeccionStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los productos no se ha guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    confeccion
                });
            });
      
    },
    getMedidas: (req, res) => {
        //Find 
        confeccionHombre.find({}).exec((err, medidas) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al devolver las medidas'
                });
            }
            if (!medidas) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay medidas para mostrar !!'
                });
            }
            return res.status(200).send({
                status: 'success',
                medidas
            });

        });
    },
    getConfeccionEspecifico: (req, res) => {
        //tomar el id de la url
        var confeccionId = req.params.id;

        //comprobar que existe
        if (!confeccionId || confeccionId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el producto'
            });
        }
        //Buscar el producto
        confeccionHombre.findById(confeccionId, (err, confeccion) => {
            if (err || !confeccion) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el producto'
                });
            }
            //devolverlo en json
            return res.status(404).send({
                status: 'success',
                confeccion
            });
        });
    },
    updateConfeccion: (req, res) => {
        //Tomar el id del producto por la url
        var confeccionId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //Validar los datos
       
            //Find and update
            confeccionHombre.findOneAndUpdate({ _id: confeccionId }, params, { new: true }, (err, medidasUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });
                }
                if (!medidasUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el producto'
                    });
                }
                return res.status(500).send({
                    status: 'success',
                    producto: medidasUpdate
                });
            });
       
    },
    uploadMedidas: (req, res) => {
        //tomar el fichero de la peticion
        var fileName = 'Imagen no subida...';
        console.log(req.files);
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
            var confeccionId = req.params.id;
            if(confeccionId){
                // Buscar el Producto, asignarle el nombre de la imagen y actualizarlo
                confeccionHombre.findOneAndUpdate({ _id: confeccionId }, { image: file_name }, { new: true }, (err, medidaUpdated) => {
                    if (err || !medidaUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        producto: medidaUpdated
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

    getImageHombre: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/medidasHombre/' + file;
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
}

module.exports = controller;