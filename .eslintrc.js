module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'supertest.**.expect'],
      },
    ],
  },
};
