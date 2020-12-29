import AJV from 'ajv';
import S from 'fluent-schema';
import { FastifyServerOptions } from 'fastify';
import { Options as SequelizeOptions } from 'sequelize';
import ConfigValidationError from '../errors/ConfigValidationError';
import { logger } from '../logger';
import databaseLogger from '../logger/databaseLogger';

type Config = {
  HTTP_PORT: number | string;
  LISTENING_IP: string;
  database: SequelizeOptions;
};

export default class ConfigService {
  private readonly ajv = new AJV({ allErrors: true });
  private readonly configSchema = S.object()
    .prop('HTTP_PORT', S.anyOf([S.number(), S.string()]).required())
    .prop('LISTENING_IP', S.string())
    .prop('database', S.object())
    .valueOf();

  constructor(private config: Config) {
    this.validate();
  }

  getFastifyConfig(): FastifyServerOptions {
    return {
      ignoreTrailingSlash: true,
      logger,
    };
  }
  getSequelizeConfig(): SequelizeOptions {
    const { database, username, password, host, port } = this.config.database;

    return {
      dialect: 'postgres',
      database,
      username,
      password,
      host,
      port,
      logging: databaseLogger,
      pool: {
        max: 60,
      },
    };
  }

  getListeningIp() {
    return this.config.LISTENING_IP || '0.0.0.0';
  }

  getHttpPort(): number {
    return Number(this.config.HTTP_PORT);
  }

  private validate() {
    const validate = this.ajv.compile(this.configSchema);
    const isConfigValid = validate(this.config);

    if (!isConfigValid) {
      throw new ConfigValidationError(validate.errors);
    }
  }
}
