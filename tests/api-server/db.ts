import { Options as SequelizeOptions } from 'sequelize';
import { Database } from '../../src/database';
import configService from '../../src/factories/configService';

const sequelizeConfig = configService.getSequelizeConfig();

if (process.env.pipeLogging !== 'true') {
  sequelizeConfig.logging = false;
}

const options: SequelizeOptions = {
  ...sequelizeConfig,
};

const db = new Database(options);

const modelDefiners = [require('../../src/database/models/User')];
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

export default db;
