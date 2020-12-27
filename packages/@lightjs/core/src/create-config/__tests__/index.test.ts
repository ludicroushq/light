import { create } from 'domain';
import { createConfig } from '..';

it('creates config', () => {
  expect(createConfig()).toMatchObject({});
  expect(createConfig({})).toMatchObject({});
});

describe('with root', () => {
  it('creates config', () => {
    expect(createConfig({ root: 'test' })).toMatchObject({});
  });
});
