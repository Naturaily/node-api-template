import { FastifyInstance } from 'fastify';
import { SequelizeOptions } from 'sequelize-typescript';
import { Database } from '../database';
import { User } from '../database/User';

export let db: Database;

export default function databasePlugin(fastify: FastifyInstance, options: SequelizeOptions) {
  options.models = [User];

  db = new Database(options);

  return db.connect().then(() => {
    fastify.log.info('Database connection has been established successfully.');
    fastify.addHook('onClose', () => db.disconnect());
  });
}
