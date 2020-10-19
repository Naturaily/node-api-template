import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Model, ModelCtor } from 'sequelize';

export class Database extends Sequelize {
  constructor(options: SequelizeOptions) {
    super(options);
  }

  async connect() {
    await this.authenticate();
  }

  async disconnect() {
    return this.close();
  }

  getModel<M>(modelName: string): ModelCtor<Model<M>> {
    if (!this.models[modelName]) {
      throw new Error(`Attempting access to not defined model ${modelName}.`);
    }

    return this.models[modelName];
  }
}
