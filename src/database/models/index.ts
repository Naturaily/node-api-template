import { Sequelize } from 'sequelize/types';
import userInit from './User';

export const initModels = (sequelize: Sequelize) => {
  userInit(sequelize);
};
