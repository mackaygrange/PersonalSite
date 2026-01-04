module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // Enforce Allman-style braces
    'brace-style': ['error', 'allman', { allowSingleLine: false }],
    // Require braces for all control blocks
    curly: ['error', 'all'],
    // Relax some TS strictness for this project
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ['dist/', 'build/', 'node_modules/', '*.config.js', '*.config.cjs', 'vite.config.ts'],
};
