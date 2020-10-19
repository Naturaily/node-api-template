import { Sequelize } from 'sequelize-typescript';
import Umzug from 'umzug';
import path from 'path';
import configService from '../factories/configService';

const sequelize = new Sequelize(configService.getSequelizeConfig());

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  logging: false,
  migrations: {
    params: [sequelize.getQueryInterface()],
    path: path.join(__dirname, './migrations'),
    pattern: /\.ts$/,
  },
});

const task = (process.argv[2] || '').trim();

if (task === 'up') {
  umzug.up().then((result) => {
    console.log('Migrations up went successful!', result);
    process.exit(0);
  });
}

if (task === 'down') {
  umzug.down().then((result) => {
    console.log('Migrations down went successful!', result);
    process.exit(0);
  });
}
