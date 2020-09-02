import pino from 'pino';
import { hostname } from 'os';
import { version } from '../package.json';

const level = (() => {
  switch (process.env.NODE_ENV) {
    case 'test':
    case 'development':
      return 'trace';
    default:
      return 'info';
  }
})();

export const logger = pino({
  level,
  base: {
    pid: process.pid,
    hostname: hostname(),
    version,
  },
});
