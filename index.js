'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

//mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Modist',{useNewUrlParser: true})
    .then(()=> {
        console.log('la conexion a la base de datos se ha realizado corectamente!!');
        
        // Crear servidor y escuchar peticiones
        app.listen(port, () => {
            console.log('Servidor corriendo en htpp://localhost'+port)
        });
    });