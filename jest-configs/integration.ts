import config from '../jest.config';

config.testMatch = ['**/*.test.ts'];
config.rootDir = '../';
config.silent = true;
config.noStackTrace = true;

export default config;
