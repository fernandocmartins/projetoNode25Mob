const Banco = require("../model/banco");
const login_token = require("../middleware/login_token");

function banksList(call, callback) {
    if (login_token(call)) {
        Banco.find((error, result) => {
            if (error) return callback(null, error);
            return callback(null, {bancos: result});
        });
    } else {
        return callback(new Error('Erro na autenticação do Token!'), null);
    }
}

function addBank(call, callback) {
    if (login_token(call)) {
        Banco(call.request)
        .save()
        .then((result) => callback(null, result))
        .catch((err) => callback(null, err));
    } else {
        return callback(new Error('Erro na autenticação do Token!'), null);
    }
}

function updateBank(call, callback) {
    if (login_token(call)) {
        Banco.findByIdAndUpdate(call.request.id, call.request.Banco, {new: true})
        .then((result) => callback(null, result))
        .catch((err) => callback(err, null));
    } else {
        return callback(new Error('Erro na autenticação do Token!'), null);
    }
}

const funcoes_grpc = {
    banksList,
    addBank,
    updateBank
}

module.exports = funcoes_grpc;