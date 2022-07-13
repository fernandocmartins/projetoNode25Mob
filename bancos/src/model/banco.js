const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome_banco: {type:String, required:true},
    tipo_conta: {type:String, required:true},
    nome_titular: {type:String, required:true},
    limite_cartao: {type:String, required:true},
    apikey: {type:String, required:true}, 
});

module.exports = mongoose.model('Banco', schema);