const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if(!req.headers['login-token']){
        return res.json({error: 'Necesitas incluir login-token en la cabecera'});
    }
         const loginToken = req.headers['login-token'];
         let payload = {};

         try {
            payload = jwt.decode(loginToken, 'secret');
           }
           catch(err){
              return res.json({ error: 'El token es incorrecto' });
           }
    if(payload.expiredAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado' });
    }
    req.loginId = payload.loginId;

    next();
};

module.exports = {
    checkToken: checkToken
}