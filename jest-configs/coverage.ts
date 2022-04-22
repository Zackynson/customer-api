import config from '../jest.config';

config.collectCoverage = true;
config.rootDir = '../';
config.coverageThreshold = {
  global: {
    branches: 0,
    functions: 0,
    lines: 0,
    statements: 0,
  },
};
config.silent = true;
config.noStackTrace = true;

export default config;
