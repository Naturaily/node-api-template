import supertest from 'supertest';
import configService from '../../src/factories/configService';

export const request = supertest(`http://localhost:${configService.getHttpPort()}`);

export class LogInterceptor {
  private logs = [];
  private tempStr = '';

  constructor(stream) {
    stream
      .on('data', (chunk) => {
        this.tempStr += chunk;
      })
      .on('end', () => {
        this.logs.push(JSON.parse(this.tempStr));
        this.tempStr = '';
      });
  }

  getLogs() {
    return this.logs;
  }

  cleanLogs() {
    this.logs = [];
  }

  countErrors() {
    return this.logs.filter(({ level }) => level === 50).length;
  }

  expectLogs(expectedCount: number, strict = true) {
    const isExpectedCount = strict ? this.logs.length === expectedCount : this.logs.length >= expectedCount;

    if (!isExpectedCount) {
      throw new Error("Count of logs doesn't match expected count of logs");
    }
  }
}
