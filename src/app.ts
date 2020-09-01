import fastify from 'fastify';
import configService from './factories/configService';
import routes from './routes';

export const app = fastify(configService.getFastifyConfig())
  .decorate('config', configService)
  .register(routes);

export async function start() {
  await app.ready();
  await app.listen(configService.getHttpPort(), configService.getListeningIp());
}
