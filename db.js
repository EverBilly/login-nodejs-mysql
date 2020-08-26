const Sequelize = require('sequelize');

const UserModel = require('./models/users');
const LoginModel = require('./models/logins')

const sequelize = new Sequelize('crud', 'root', 'Admin2020', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Login = LoginModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Conexion Tablas');
    });

module.exports = {
    User,
    Login
}