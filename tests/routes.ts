import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import Light from '../src/index';

describe('routes', () => {
  it('should not run with errors', async () => {
    expect.assertions(1);
    expect(() => {
      const light = new Light({
        routes: join(__dirname, 'seeds/errors/routes.ts'),
      });
      return light;
    }).toThrow();
  });

  it('should run with an array of routes', async () => {
    const light = new Light({
      routes: [join(__dirname, 'seeds/routes/function.ts'), join(__dirname, 'seeds/routes/object.ts')],
    });
    const url = await listen(light.server);
    expect.assertions(4);

    {
      const req = await fetch(resolve(url, '/function'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    }

    {
      const req = await fetch(resolve(url, '/object'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'object world' });
    }
  });
});
