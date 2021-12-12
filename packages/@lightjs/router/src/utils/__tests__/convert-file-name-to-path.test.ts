import { convertFileNameToPath } from '../convert-file-name-to-path';

describe('static routes', () => {
  it.each([
    ['/index', '/'],
    ['/foo', '/foo'],
    ['/foo/bar', '/foo/bar'],
  ])('convertFileNameToPath(%s) returns "%s"', (fileName, expected) => {
    expect(convertFileNameToPath(fileName)).toEqual(expected);
  });
});

describe('parametric routes', () => {
  it.each([
    ['/[foo]', '/:foo'],
    ['/[foo]/[bar]', '/:foo/:bar'],
    ['/[foo]/[bar]/[baz]', '/:foo/:bar/:baz'],
  ])('convertFileNameToPath(%s) returns "%s"', (fileName, expected) => {
    expect(convertFileNameToPath(fileName)).toEqual(expected);
  });
});

describe('wildcard routes', () => {
  it.each([
    ['/[...foo]', '/*'],
    ['/[foo]/[...bar]', '/:foo/*'], // might be invalid, need to check
    ['/[foo]/[...bar]/[baz]', '/:foo/*/:baz'], // might be invalid, need to check
  ])('convertFileNameToPath(%s) returns "%s"', (fileName, expected) => {
    expect(convertFileNameToPath(fileName)).toEqual(expected);
  });
});
