import pino from 'pino';
import { hostname } from 'os';
import { version } from '../../package.json';

const level = ['test', 'development'].includes(process.env.NODE_ENV) ? 'trace' : 'info';

export const logger = pino({
  level,
  base: {
    pid: process.pid,
    hostname: hostname(),
    version,
  },
});

// @todo: Find solution to use pino.final with jest
// @see: https://github.com/pinojs/pino/issues/761
const unhandledHandler = (message: string) =>
  process.env.NODE_ENV !== 'test'
    ? pino.final(logger, (error: Error) => {
        logger.error(error, message);

        process.exit(1);
      })
    : () => null;

process
  .on('unhandledRejection', unhandledHandler('unhandledRejection'))
  .on('uncaughtException', unhandledHandler('uncaughtException'));
