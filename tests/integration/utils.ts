import supertest from 'supertest';
import configService from '../../src/factories/configService';

export const request = supertest(`http://localhost:${configService.getHttpPort()}`);
