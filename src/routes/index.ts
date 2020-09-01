import * as ping from '../handlers/ping';

export default function routes(fastify, opts, next) {
  fastify.get('/ping', ping.pong);

  next();
}
