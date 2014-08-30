var path = require('path');

GLOBAL = {};


PROJECT_ROOT = path.join(path.dirname(__filename), '../');
SOURCE_ROOT = path.join(PROJECT_ROOT, 'src');


GLOBAL.port = 8300;


GLOBAL.db = {
  host: 'localhost',
  port: 6379
};


module.exports = exports = GLOBAL;