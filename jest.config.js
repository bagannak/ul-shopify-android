module.exports = {
  globalSetup: '<rootDir>/setup/setup.ts',
  globalTeardown: '<rootDir>/setup/teardown.ts',
  verbose: false,
  silent: true,
  preset: 'ts-jest',
  runner: 'groups',
  testTimeout: 3600000,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  testRunner: 'jest-jasmine2',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters: ['default', 'jest-allure', '<rootDir>/dist/customReporter.js'],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
};
