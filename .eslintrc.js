'use strict';

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-ordering': [
      2,
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
        ],
      },
    ],
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'prettier/prettier': 1,
    'sort-keys': 2,
  },
};
