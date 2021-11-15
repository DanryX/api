const fs = require('fs');

module.exports = (sequelize, DataTypes) => {
  const models = [];
  
  fs
    .readdirSync('./models')
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
        const model = require(`./${file}`)(sequelize, DataTypes);
        models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(sequelize.models);
    }
  });

  return models;
}
