'use strict';
var redisConnection = require('./redisconnection');

var expire = 6 * 60 * 60;

var SCHEMA = 'session:';
var COL_EXPIRE_DATE = 'expire_date';
var COL_USER = 'user';

var connection = null;

var session = function() {
  this.connected = false;

  getConnection();

  function getConnection(callback) {
    connection = redisConnection.getConnection(function(err, result) {
      if (err !== null) {
        console.log(err);
        throw err;
      }
    });
  }
};
