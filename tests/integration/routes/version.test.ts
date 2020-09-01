import { request } from '../utils';

describe('GET /version', () => {
  it('should respond to version', async () => {
    const response = await request.get('/version').expect(200);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('version');
    expect(response.body.version).toMatch(/(\d+)\.(\d+)\.(\d+)/);
  });
});
