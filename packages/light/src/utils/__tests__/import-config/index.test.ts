import { join } from 'path';

import importConfig from '../../import-config';

describe('import-config', () => {
  it('returns empty object with no config', () => {
    const cwd = jest.spyOn(process, 'cwd');
    cwd.mockReturnValue(join(__dirname));

    expect(importConfig()).toMatchObject({});

    cwd.mockRestore();
  });

  it('returns empty object when undefined export', () => {
    const cwd = jest.spyOn(process, 'cwd');
    cwd.mockReturnValue(join(__dirname, './seeds/config'));

    const config = importConfig();
    expect(config).toMatchObject({
      hello: 'world',
    });

    cwd.mockRestore();
  });
});
