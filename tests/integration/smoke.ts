import { request } from './utils';
import db from '../api-server/db';
import { User } from '../../src/database/User';
import { userAccessor } from '../utils/userAccessor';
import * as TcpProxy from 'node-tcp-proxy';

describe('Smoke test', () => {
  let tcpProxy;

  beforeAll(async () => {
    await db.connect();
    await db.sync({ force: true });

    tcpProxy = TcpProxy.createProxy(8181, 'postgres-test', 5432, { quiet: true });

    const user = (await db.models.User.create({
      email: 'naturalnyjanusztestowy@gmail.com',
      name: 'Januszek',
    })) as User;
    const userRaw = user.toJSON() as User;
    userAccessor.set({ ...userRaw });
  });

  afterAll(async () => {
    tcpProxy.end();
    await db.disconnect();
  });

  it('should always pass', async () => expect('Hello world!'));

  it('should get response from API server', async () => request.get('/ping').expect(200));
});
