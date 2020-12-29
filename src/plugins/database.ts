import { FastifyInstance } from 'fastify';
import { Options } from 'sequelize';
import { Database } from '../database';

export let db: Database;

export default function databasePlugin(fastify: FastifyInstance, options: Options) {
  const modelDefiners = [require('../database/models/User')];

  db = new Database(options);

  for (const modelDefiner of modelDefiners) {
    modelDefiner(db);
  }

  return db.connect().then(() => {
    fastify.log.info('Database connection has been established successfully.');
    fastify.addHook('onClose', () => db.disconnect());
  });
}
