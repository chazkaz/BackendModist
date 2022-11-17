'use strict'

//Cargar modulos de node para crear el servido
var express = require('express');
const bodyParser = require('body-parser');

//Ejecutar express(http)
var app = express();
//Cargar ficheros rutas
var producto_routes = require('./routes/producto');
var confeccionHombre_routes = require('./routes/confeccion-hombre');
var confeccionMujer_routes = require('./routes/confeccion-mujer');

//MiddLewares es algo que se ejecuta antes de que se procese
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// activar CORS para permitir peticiones del frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//añadir prefijos a rutas / cargar rutas
app.use('/api',producto_routes);
app.use('/api',confeccionHombre_routes);
app.use('/api',confeccionMujer_routes);
 


//exportar modulos (fichero actual)
module.exports = app;