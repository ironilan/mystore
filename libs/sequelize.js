const { Sequelize } = require('sequelize')

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',//dialect: 'mysql',
  logging: true
}); //esto va a gestionar el pooling es decir ya no es necesario usar postgres.pool.js


setupModels(sequelize);

//sequelize.sync(); esto sincroniza tu base de datos y es peligroso porque cada cambio sobreescribiria, por eso mejor suar migraciones

module.exports = sequelize;
