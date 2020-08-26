const router = require('express').Router();

const middlewares = require('./middlewares');
const UsersRouter = require('./api/users');
const LoginsRouter = require('./api/login');

router.use('/users', middlewares.checkToken, UsersRouter);
router.use('/login', LoginsRouter);

module.exports = router;