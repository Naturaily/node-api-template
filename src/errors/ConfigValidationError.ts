import { ErrorObject } from 'ajv';

export default class ConfigValidationError extends Error {
  validationErrors: ErrorObject[];

  constructor(validationErrors: ErrorObject[]) {
    super(`Config validation error: ${JSON.stringify(validationErrors)}`);
    this.validationErrors = validationErrors;
  }
}
