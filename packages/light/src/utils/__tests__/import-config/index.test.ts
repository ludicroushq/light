import { join } from 'path';

import { importLightConfig } from '../../import-config';

describe('import-config', () => {
  it('returns empty object with no config', () => {
    const cwd = jest.spyOn(process, 'cwd');
    cwd.mockReturnValue(join(__dirname));

    expect(importLightConfig()).toMatchObject({});

    cwd.mockRestore();
  });

  it('returns empty object when undefined export', () => {
    const cwd = jest.spyOn(process, 'cwd');
    cwd.mockReturnValue(join(__dirname, './seeds/config'));

    const config = importLightConfig();
    expect(config).toMatchObject({
      root: 'src',
    });

    cwd.mockRestore();
  });
});
