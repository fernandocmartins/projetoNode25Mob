const mongoose = require("mongoose");
const cfg = require("./config/cfg")
const grpc = require("@grpc/grpc-js");
const cfg_db = require("./config/cfg_db");
const rota_banco = require("./routes/rotas_banco");
const server = new grpc.Server();

mongoose.connect(cfg_db.db_path, { useNewUrlParser: true, useUnifiedTopology: true });
server.addService(cfg, rota_banco);
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
        console.log("Server running at http://127.0.0.1:30043");
        server.start()
});