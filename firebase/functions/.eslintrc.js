module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // "google",
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.ts'],
        paths: ['node_modules/', 'node_modules/@types'],
      },
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-undef': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_|$',
      },
    ],
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
