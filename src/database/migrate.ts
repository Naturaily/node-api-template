import { Sequelize } from 'sequelize-typescript';
import configService from '../factories/configService';
import Umzug from 'umzug';
import path from 'path';

const sequelize = new Sequelize(configService.getSequelizeConfig());

const umzugFactory = (directoryName) =>
  new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    logging: false,
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: path.join(__dirname, `./${directoryName}`),
      pattern: /\.ts$/,
    },
  });

const migrator = umzugFactory('migrations');
const seeder = umzugFactory('seeders');

const task = (process.argv[2] || '').trim();

if (task === 'up') {
  migrator.up().then(() => {
    console.log('Migrations up went successful!');
    seeder.up().then(() => {
      console.log('Seeds filled the database!');
      process.exit(0);
    });
  });
}

if (task === 'down') {
  migrator.down().then(() => {
    seeder.down().then(() => {
      console.log('Migrations down went successful!');
      process.exit(0);
    });
  });
}

export type Migration = typeof migrator._types.migration;
export type Seed = typeof seeder._types.migration;
