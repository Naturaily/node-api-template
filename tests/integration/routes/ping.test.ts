import { request } from '../utils';

describe('GET /ping', () => {
  it('should respond to ping', async () => {
    const response = await request.get('/ping').expect(200);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('pong', true);
  });
});
