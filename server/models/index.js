const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'clan_niggaz_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const models = {
  User: require('./User')(sequelize),
  Booking: require('./Booking')(sequelize),
  Equipment: require('./Equipment')(sequelize),
  Project: require('./Project')(sequelize),
  Invoice: require('./Invoice')(sequelize),
  Service: require('./Service')(sequelize),
  Promotion: require('./Promotion')(sequelize),
};

// Define relationships
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};