const mongoose = require("mongoose");

const schema_usuario = new mongoose.Schema({
  nomeusuario: {type: String, unique: true },
  email: {type: String },
  senha: { type: String },
  nomecompleto: { type: String },
  telefone: { type: String },
  datacadastro: { type: Date, default: Date.now },
  apikey:{ type:String, unique: true }
  }); 
  
module.exports = mongoose.model("Usuario", schema_usuario);