const PROTO_PATH = "../banco.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const GerenciarBanco = grpc.loadPackageDefinition(packageDefinition).GerenciarBanco;
const user_grpc = new GerenciarBanco(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = user_grpc;