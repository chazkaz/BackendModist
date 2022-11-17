'use strict'
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ConfeccionMujerSchema = Schema({
     busto : String,
     bajoBusto : String,
     manga : String,
     hombro : String,
     cintura : String,
     cadera : String,
     entrepierna : String,
     pierna : String,
     image : String
});
module.exports = mongoose.model('confeccionMujer',ConfeccionMujerSchema);