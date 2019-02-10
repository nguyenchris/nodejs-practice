const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'orange102938', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;