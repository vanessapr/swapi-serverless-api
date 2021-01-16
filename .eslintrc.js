module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
    'max-classes-per-file': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'block-like', 'return', 'function', 'expression'],
        next: ['if', 'block', 'block-like', 'return'],
      },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: ['expression'] },
      { blankLine: 'never', prev: ['function'], next: ['block'] },
    ],
  },
};
