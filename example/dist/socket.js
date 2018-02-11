'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var result = function result() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


  var result = {
    meta: {
      message: 'Success',
      status: 'OK',
      success: true
    }
  };

  if (!data) return result;

  return _extends({}, result, {
    data: data
  });
};

exports.default = function (socket) {

  socket.on('join', function (token, req, callback) {

    socket.join(req.channel);

    if (callback) callback(result());
  });

  socket.on('leave', function (token, req, callback) {

    socket.leave(req.channel);

    if (callback) callback(result());
  });

  socket.on('message', function (token, req, callback) {

    if (callback) callback(result());

    socket.in(req.channel).emit(req.data);
  });
};