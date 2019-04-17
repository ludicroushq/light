import { join } from 'path';
import Light from '../../src/index';

const start = Date.now();

const light = new Light({
  routes: join(__dirname, 'routes'),
});

light.server.listen(3000, (): void => {
  console.log(Date.now() - start); // eslint-disable-line
});
