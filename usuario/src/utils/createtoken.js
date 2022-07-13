const jwt = require("jsonwebtoken");
const cfg = require("../config/cfg");

const create_token = (id, nomeusuario, email) => {
    return jwt.sign({id:id, nomeusuario:nomeusuario, email:email},cfg.jwt_secret,{expiresIn:cfg.jwt_expires});
}

module.exports = create_token;