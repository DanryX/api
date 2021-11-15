const Sequelize = require('sequelize');

const config = require('../config/config.json');
const getModels = require('../models');

const sequelize = new Sequelize(config.development);

getModels(sequelize, Sequelize.DataTypes);

module.exports = sequelize;
