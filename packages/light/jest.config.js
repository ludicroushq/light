module.exports = {
  // roots: [
  //   '<rootDir>/tests',
  // ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/lib/*'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
