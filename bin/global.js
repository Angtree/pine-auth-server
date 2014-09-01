var path = require('path');
var env = process.env.SETTINGS || 'local';


GLOBAL = {};

PROJECT_ROOT = path.join(path.dirname(__filename), '../');
SOURCE_ROOT = path.join(PROJECT_ROOT, 'src');
TEST_ROOT = path.join(PROJECT_ROOT, 'test');

(function() {

  var base = {
    port: 8300,
    db: {
      host: 'localhost',
      port: 6379
    }
  };

  var local = {
    port: 8300,
    db: {
      host: 'localhost',
      port: 6379
    }
  };

  var development = {
  };

  var production = {
  };

  switch (env) {
    case 'local':
      GLOBAL = overwriteSettings(base, local);
      break;
    case 'development':
      throw new Error('development settings not set.');
    case 'production':
      throw new Error('production settings not set.');
    default:
      throw new Error('SETTINGS environment can be one of \'local\', \'development\', \'production\'.');
  }

  function overwriteSettings(baseSettings, specificSettings) {
    Object.keys(specificSettings).forEach(function(key) {
      if (isObjectAndNotArray(baseSettings[key]) && isObjectAndNotArray(specificSettings[key]))
        overwriteSettings(baseSettings[key], specificSettings[key]);
      else
        baseSettings[key] = specificSettings[key];
    });
    return baseSettings;
  }

  function isObjectAndNotArray(object) {
    return (typeof object === 'object' && !Array.isArray(object));
  }

  module.exports = exports = GLOBAL;
})();