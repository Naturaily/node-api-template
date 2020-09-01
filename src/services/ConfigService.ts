import AJV from 'ajv';
import S from 'fluent-schema';
import { FastifyServerOptions } from 'fastify';
import ConfigValidationError from '../errors/ConfigValidationError';

type Config = {
  HTTP_PORT: number | string;
  LISTENING_IP: string;
};

export default class ConfigService {
  private readonly ajv = new AJV({ allErrors: true });
  private readonly configSchema = S.object()
    .prop('HTTP_PORT', S.anyOf([S.number(), S.string()]).required())
    .prop('LISTENING_IP', S.string())
    .valueOf();

  constructor(private config: Config) {
    this.validate();
  }

  getFastifyConfig(): FastifyServerOptions {
    return {
      ignoreTrailingSlash: true,
      logger: true,
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
