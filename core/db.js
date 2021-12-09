const Sequelize = require('sequelize');

const config = require('../config/config.js');
const getModels = require('../models');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

getModels(sequelize, Sequelize.DataTypes);

sequelize.Op = Sequelize.Op;

module.exports = sequelize;
