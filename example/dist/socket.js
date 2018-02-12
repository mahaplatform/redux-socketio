'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = function authenticate(token) {

  return true;
};

exports.default = function (io, socket) {

  var channels = [];

  var authorize = function authorize(channel) {
    return _lodash2.default.includes(channels, channel);
  };

  socket.on('join', function (token, channel, message, callback) {

    var authenticated = authenticate(token);

    var authorized = authorize(channel);

    if (authenticated && !authorized) {

      socket.join(channel);

      channels.push(channel);
    }

    if (callback) callback(authenticated);
  });

  socket.on('leave', function (token, channel, message, callback) {

    var authorized = authorize(channel);

    if (authorized) {

      socket.leave(channel);

      channels = channels.filter(function (ch) {
        return ch !== channel;
      });
    }

    if (callback) callback(authorized);
  });

  socket.on('message', function (token, channel, data, callback) {

    var authorized = authorize(channel);

    if (authorized) io.in(channel).send(data);

    if (callback) callback(authorized);
  });
};