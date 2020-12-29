import { create } from 'domain';
import { createConfig } from '../index';

it('creates config', () => {
  expect(createConfig()).toMatchObject({});
  expect(createConfig({})).toMatchObject({});
});

describe('with root', () => {
  it('creates config', () => {
    expect(createConfig({ root: 'test' })).toMatchObject({});
  });
});
