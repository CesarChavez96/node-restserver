const jwt = require('jsonwebtoken');
//////////////////////////
//Verificar Token
/////////////////////////77
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};
//////////////////////////
//Verificar AdminRole
/////////////////////////77
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es admnistrador'
            }
        });
    }
}

//////////////////////////
//Verificar Token en Img
/////////////////////////77
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};
module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}