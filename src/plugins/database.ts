import { FastifyInstance } from 'fastify';
import { Options } from 'sequelize';
import { Database } from '../database';
import { initModels } from '../database/models';

export let db: Database;

export default function databasePlugin(fastify: FastifyInstance, options: Options) {
  db = new Database(options);

  initModels(db);

  return db.connect().then(() => {
    fastify.log.info('Database connection has been established successfully.');
    fastify.addHook('onClose', () => db.disconnect());
  });
}
