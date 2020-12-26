import { SequelizeOptions } from 'sequelize-typescript';
import { Database } from '../../src/database';
import { User } from '../../src/database/models/User';
import configService from '../../src/factories/configService';

const sequelizeConfig = configService.getSequelizeConfig();

if (process.env.pipeLogging !== 'true') {
  sequelizeConfig.logging = false;
}

const options: SequelizeOptions = {
  ...sequelizeConfig,
  models: [User],
};

const db = new Database(options);

export default db;
