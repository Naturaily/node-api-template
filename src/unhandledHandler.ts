import * as pino from 'pino';
import { logger } from './logger';

const unhandledHandler = (message: string) =>
  pino.final(logger, (error: Error) => {
    logger.error(error, message);

    process.exit(1);
  });

process
  .on('unhandledRejection', unhandledHandler('unhandledRejection'))
  .on('uncaughtException', unhandledHandler('uncaughtException'));
