const PROTO_PATH = "./listabancos.proto";
const grpc = require("@grpc/grpc-js");
const loadProto = require("@grpc/proto-loader");

const definition = loadProto.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const userProto = grpc.loadPackageDefinition(definition).ManageBank.service;

module.exports = userProto;