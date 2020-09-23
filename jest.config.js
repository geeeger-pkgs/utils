module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts'],
  coverageDirectory: '../coverage',
  coverageReporters: ['cobertura', 'text'],
  globals: {
    skipBabel: true,
  },
  preset: 'ts-jest',
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'jest tests', suiteNameTemplate: '{filepath}' }],
  ],
  rootDir: 'packages',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts'],
};
