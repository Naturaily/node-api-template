import { Options as SequelizeOptions } from 'sequelize';
import { Database } from '../../src/database';
import configService from '../../src/factories/configService';
import { initModels } from '../../src/database/models';

const sequelizeConfig = configService.getSequelizeConfig();

if (process.env.pipeLogging !== 'true') {
  sequelizeConfig.logging = false;
}

const options: SequelizeOptions = {
  ...sequelizeConfig,
};

const db = new Database(options);

initModels(db);

export default db;
