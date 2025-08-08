const { response } = require('express');
const jwt = require('jsonwebtoken');

const tokenValidator = (req, res = response, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try{
        const { id, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.name = name;
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })

    }

    next();
}

module.exports = {
    tokenValidator
}