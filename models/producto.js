'use strict'
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    title : String,
    content : String,
    price : String,
    image : String

});
 module.exports = mongoose.model('Producto', ProductosSchema);
 // productos --> guarda documentos de este tipo y con esta estruct dentro de la coleccion