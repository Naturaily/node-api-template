import { Sequelize, Options, Model, ModelCtor } from 'sequelize';

type AvailableModels = 'User';

export class Database extends Sequelize {
  constructor(options: Options) {
    super(options);
  }

  async connect() {
    await this.authenticate();
  }

  async disconnect() {
    return this.close();
  }

  getModel<M>(modelName: AvailableModels): ModelCtor<Model<M>> {
    if (!this.models[modelName]) {
      throw new Error(`Attempting access to not defined model ${modelName}.`);
    }

    return this.models[modelName];
  }
}
