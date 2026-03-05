module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Disable the "unstable nested components" warning
    'react/no-unstable-nested-components': 'off',

    // Other example rules
    'react/react-in-jsx-scope': 'off', // React 17+ no need to import React
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
  },
};
