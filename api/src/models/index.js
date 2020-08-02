import Sequelize from 'sequelize';
import user from './user';
import workspace from './workspace';
import analytic from './analytic';
import link from './link';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
);

const models = {
  User: user(sequelize, Sequelize.DataTypes),
  Workspace: workspace(sequelize, Sequelize.DataTypes),
  Link: link(sequelize, Sequelize.DataTypes),
  Analytic: analytic(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
