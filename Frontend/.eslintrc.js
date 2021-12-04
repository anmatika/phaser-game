module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['off'],
    'no-useless-constructor': ['off'],
    'no-console': ['off'],
    'no-new': ['off'],
    'no-unused-vars': ['warn'],
    'max-len': ['off'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],

  },
};
