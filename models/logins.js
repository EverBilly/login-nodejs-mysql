module.exports = (sequelize, type) => {
    return sequelize.define('login', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.TEXT,
        email: type.TEXT,
        password: type.TEXT
    });
}