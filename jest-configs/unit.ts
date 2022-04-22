import config from '../jest.config';

config.testMatch = ['**/*.spec.ts'];
config.rootDir = '../';
config.silent = true;
config.noStackTrace = true;

export default config;
