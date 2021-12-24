import { createRoute, withConnect } from '../index';

it('exports route', () => {
  expect(createRoute).toBeTruthy();
});

it('exports withConnect', () => {
  expect(withConnect).toBeTruthy();
});
