import config from './rollup.config';

config.format     = 'umd';
config.dest       = 'dist/wspd.umd.js';
config.moduleName = 'wspd';

export default config;
