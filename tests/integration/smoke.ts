import { request } from './utils';
import db from '../api-server/db';
import { User } from '../../src/database/User';
import { userAccessor } from '../utils/userAccessor';

describe('Smoke test', () => {
  beforeAll(async () => {
    await db.connect();
    await db.sync({ force: true });

    const user = (await db.models.User.create({
      email: 'naturalnyjanusztestowy@gmail.com',
      name: 'Januszek',
    })) as User;
    const userRaw = user.toJSON() as User;
    userAccessor.set({ ...userRaw });
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('should always pass', async () => expect('Hello world!'));

  it('should get response from API server', async () => request.get('/ping').expect(200));
});
