'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION_TYPES = ['SOCKETIO_INIT', 'SOCKETIO_JOIN', 'SOCKETIO_LEAVE', 'SOCKETIO_MESSAGE'];

var reduxSocketIo = function reduxSocketIo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var client = createClient(options);

  return function (store) {
    return function (next) {
      return function (action) {
        var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
            _action$type$match2 = _slicedToArray(_action$type$match, 3),
            namespace = _action$type$match2[1],
            type = _action$type$match2[2];

        if (!_lodash2.default.includes(ACTION_TYPES, type)) return next(action);

        if (type === 'SOCKETIO_INIT') {

          client.on('connect', action.connect);

          client.on('disconnect', action.disconnect);

          client.on('message', action.message);
        } else if (type === 'SOCKETIO_JOIN') {

          console.log('socketio join', action.channel);

          emit(client, store, namespace, action, 'join');
        } else if (type === 'SOCKETIO_LEAVE') {

          emit(client, store, namespace, action, 'leave');
        } else if (type === 'SOCKETIO_MESSAGE') {

          emit(client, store, namespace, action, 'message');
        }

        return next(action);
      };
    };
  };
};

var createClient = function createClient(options) {

  var socketUrl = options.url || options.protocol + '//' + options.hostname + ':' + options.port;

  return options.client || (0, _socket2.default)(socketUrl);
};

var emit = function emit(client, store, namespace, action, verb) {

  var token = action.token || null;

  var channel = action.channel || null;

  store.dispatch({
    type: withNamespace(namespace, action.request),
    channel: action.channel,
    data: action.data
  });

  client.emit(verb, token, action.channel, action.data, function (success) {

    var type = success ? action.success : action.failure;

    store.dispatch({
      type: withNamespace(namespace, type),
      channel: action.channel,
      data: action.data
    });
  });
};

var coerceArray = function coerceArray(value) {
  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var withNamespace = function withNamespace(namespace, type) {
  return namespace ? namespace + '/' + type : type;
};

exports.default = reduxSocketIo;