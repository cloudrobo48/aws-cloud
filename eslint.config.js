// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  prettier,
];
