'use strict'
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ConfeccionHombreSchema = Schema({
    cuello : String,
    pecho : String,
    manga : String,
    cintura : String,
    cadera : String,
    pantorrilla : String,
    entrepierna : String,
    pierna : String,
    image : String
});
 module.exports = mongoose.model('confeccionHombre', ConfeccionHombreSchema);