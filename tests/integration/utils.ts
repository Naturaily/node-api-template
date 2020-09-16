import supertest from 'supertest';
import configService from '../../src/factories/configService';

export const request = supertest(`http://localhost:${configService.getHttpPort()}`);

export const predicateGenerator = (logExpectedMsg) => (logs) => {
  const isIncludingLog = Boolean(logs.find((log) => log.msg === logExpectedMsg));
  return Promise.resolve(isIncludingLog);
};
