import * as ping from '../handlers/ping';
import { version } from '../handlers/version';

export default function routes(fastify, opts, next) {
  fastify.get('/ping', ping.pong);
  fastify.get('/version', version);

  next();
}
