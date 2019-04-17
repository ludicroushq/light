/* eslint-disable @typescript-eslint/no-var-requires */
const start = Date.now();
const { join } = require('path');
const { Light } = require('../../lib/index');

const light = new Light({
  routes: join(__dirname, 'routes'),
});

light.server.listen(3000, () => {
  console.log(Date.now() - start); // eslint-disable-line
});
