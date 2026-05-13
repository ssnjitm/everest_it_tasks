import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/data.db',
  logging: false,
});

export default sequelize;