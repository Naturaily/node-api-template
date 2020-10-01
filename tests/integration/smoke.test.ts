import { request } from './utils';

describe('Smoke test', () => {
  it('should always pass', async () => expect('Hello world!'));

  it('should API server work', async () => request.get('/ping').expect(200));
});
