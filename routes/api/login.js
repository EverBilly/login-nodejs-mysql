const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const { Login } = require('../../db');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const logins = await Login.findAll();
    res.json(logins);
});

router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const login = await Login.create(req.body);
    res.json(login);
});

router.post('/login', async (req, res) => {
    const login = await Login.findOne({ where: { email: req.body.email} });
    if(login) {
        const iguales = bcrypt.compareSync(req.body.password, login.password);
        if(iguales){
            res.json({ success: createToken(login) });
        }
        else {
            res.json({ error: 'Error usuario o password incorrectos' });
        }
    }
    else {
        res.json({ error: 'Error usuario o password incorrectos' });
    }
});

const createToken = (login) => {
    const payload = {
        loginId: login.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    };

    return jwt.encode(payload, 'secret');
};

module.exports = router;