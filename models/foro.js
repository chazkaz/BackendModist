'use strict'
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var foroSchema = Schema({
    title : String,
    content : String

});
 module.exports = mongoose.model('Foro', foroSchema);