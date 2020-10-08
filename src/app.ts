import fastify from 'fastify';
import database from './plugins/database';
import configService from './factories/configService';
import routes from './routes';

export const app = fastify(configService.getFastifyConfig())
  .decorate('config', configService)
  .register(database, configService.getSequelizeConfig())
  .register(routes);

export async function start() {
  await app.ready();
  console.log(`server port = ${configService.getHttpPort()}`);
  await app.listen(configService.getHttpPort(), configService.getListeningIp());
}
