import config from './jest.config';

config.testMatch = ['**/*.test.ts', '**/*-test.ts'];
config.rootDir = '../';

module.exports = config;
