'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket3 = require('./socket');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'public'), { redirect: false }));

var transport = _http2.default.createServer(server);

var io = (0, _socket2.default)(transport);

io.on('connection', _socket4.default);

transport.listen(8090);

server.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});