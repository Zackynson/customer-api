import type { Config } from '@jest/types';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config: Config.InitialOptions = {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/layers/main/config/**',
    '!<rootDir>/src/layers/**/*/index.ts',
    '!<rootDir>/src/app/app.module.ts',
    '!<rootDir>/src/main.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/src/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/src/layers/$1',
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};

export default config;
