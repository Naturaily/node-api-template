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

(async () => {
  if (task === 'up') {
    await migrator.up();
    console.log('Migrations up went successful!');

    await seeder.up();
    console.log('Seeds filled the database!');
  }

  if (task === 'down') {
    await migrator.down();
    await seeder.down();

    console.log('Migrations down went successful!');
  }

  process.exit(0);
})();

export type Migration = typeof migrator._types.migration;
export type Seed = typeof seeder._types.migration;
