const express = require("express");
const bcrypt = require("bcrypt");
const Client = require("../model/client");
const create_token = require("../utils/createtoken");
const cfg = require("../config/cfg");
const token_verify = require("../middleware/tokenverify");
const { v4: uuidv4 } = require("uuid");
const grpc = require("@grpc/grpc-js");
const route = express.Router();
const client = require("../user_grpc");

route.get("/", (req, res) => {
  Client.find((erro, dados) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao processar dados -> ${erro}` });
      res.status(200).send({ output: "ok", payload: dados });
    });
  });

route.post("/registry", (req, res) => {
  bcrypt.hash(req.body.senha, cfg.salt, (erro, result) => {
    if (erro) return res.status(500).send({ output: `Erra ao tentar gerar a senha -> ${erro}` });
    req.body.senha = result;
    req.body.apikey = uuidv4();
    const dados = new Client(req.body);
    dados
      .save()
      .then((result) => {
        res.status(201).send({ output: "Cadastro realizado", payload: result });
      })
      .catch((erro) =>
        res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` })
      );
  });
});

route.post("/login", (req, res) => {

  Client.findOne({ nomeusuario: req.body.nomeusuario }, (erro, result) => {
    if (erro) return res.status(500).send({ output: `Erro ao tentar localizar -> ${erro}` });
    if (!result) return res.status(400).send({ output: `Usuário não localizado` });
    bcrypt.compare(req.body.senha, result.senha, (erro, same) => {
      if (erro) return res.status(500).send({ output: `Erro ao validar a senha ->${erro}` });
      if (!same) return res.status(400).send({ output: `Senha inválida` });
      const token_generated = create_token(
        result._id,
        result.nomeusuario,
        result.email
      );

      const metadata = new grpc.Metadata();
      metadata.set('token', req.headers['token']);

      client.ListaTodosBancos( {} , metadata, (error, data) => {
        if (!error) res.status(200).send({output:"Autenticado",token:token_generated, bancos:data.bancos }); 
      })
    });
  });
});

route.put("/updatepassword/:id", token_verify, (req, res) => {
  Client.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
        if (erro) 
        return res
          .status(500)
          .send({ output: `Erro ao processar a atualização-> ${erro}` });
        if (!dados) 
          return res
            .status(400)
            .send({ output: `Não foi possível atualizar -> ${erro}` });
        return res.status(202).send({ output: "Atualizado", payload: dados });
    }
  )
});

module.exports = route;