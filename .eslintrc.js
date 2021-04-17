module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
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
    'max-len': ['warn'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
