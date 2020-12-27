import { createRoute, createConfig, withConnect } from '../index';

it('exports createRoute', () => {
  expect(createRoute).toBeTruthy();
});

it('exports createConfig', () => {
  expect(createConfig).toBeTruthy();
});

it('exports withConnect', () => {
  expect(withConnect).toBeTruthy();
});
