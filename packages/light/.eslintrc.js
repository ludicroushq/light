module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier/@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-throw-literal': 'off',

    // prettier
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
