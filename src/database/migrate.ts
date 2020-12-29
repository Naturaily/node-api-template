import { Sequelize } from 'sequelize';
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
    console.log('\x1b[32mMigrations up went successful!\x1b[0m');

    await seeder.up();
    console.log('\x1b[32mSeeds filled the database!\x1b[0m');
  }

  if (task === 'down') {
    await migrator.down();
    await seeder.down();

    console.log('\x1b[32mMigrations down went successful!\x1b[0m');
  }

  process.exit(0);
})();

export type Migration = typeof migrator._types.migration;
export type Seed = typeof seeder._types.migration;
