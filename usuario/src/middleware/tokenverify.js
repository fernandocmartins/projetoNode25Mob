const jwt = require("jsonwebtoken")
const cfg = require("../config/cfg");
const token_verify = (req,res,next)=>{

    const token = req.headers.token;
    if(!token)return res.status(401).send({output:`Não autorizado a fazer essa ação`});
    jwt.verify(token,cfg.jwt_secret,(erro,result)=>{
        if(erro)return res.status(401).send({output:`Token inválido -> ${erro}`})
        req.data = {
            id:result.id,
            user:result.nomeusuario,
            email:result.email
        }
        next();
    })
}

module.exports = token_verify;