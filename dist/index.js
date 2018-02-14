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

var handlers = {};

var ACTION_TYPES = ['SOCKETIO_SUBSCRIBE', 'SOCKETIO_UNSUBSCRIRBE', 'SOCKETIO_MESSAGE'];

var reduxSocketIo = function reduxSocketIo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var client = createClient(options);

  client.on('message', handleMessage);

  return function (store) {
    return function (next) {
      return function (action) {
        var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
            _action$type$match2 = _slicedToArray(_action$type$match, 3),
            namespace = _action$type$match2[1],
            type = _action$type$match2[2];

        var token = action.token || null;

        var channel = action.channel || null;

        if (type === 'SOCKETIO_SUBSCRIBE') {

          var callback = createCallback(store, action, client, namespace, 'join');

          if (!handlers[action.channel]) client.emit('join', token, channel, callback);

          addHandler(action.channel, action.action, action.handler);
        }

        if (type === 'SOCKETIO_UNSUBSCRIBE') {

          if (!_lodash2.default.includes(handlers[action.channel][action.action], action.handler)) return;

          removeHandler(action.channel, action.action, action.handler);

          var _callback = createCallback(store, action, client, namespace, 'leave');

          if (!handlers[action.channel]) client.emit('leave', token, channel, _callback);
        }

        if (type === 'SOCKETIO_MESSAGE') {

          var data = {
            channel: action.channel,
            action: action.action,
            data: action.data
          };

          var _callback2 = createCallback(store, action, client, namespace, 'message', data);

          return client.emit('message', channel, data, _callback2);
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

var addHandler = function addHandler(channel, action, handler) {

  if (!handlers[channel]) handlers[channel] = {};

  if (!handlers[channel][action]) handlers[channel][action] = [];

  if (_lodash2.default.includes(handlers[channel][action], handler)) return;

  handlers[channel][action].push(handler);
};

var removeHandler = function removeHandler(channel, action, handler) {

  if (!handlers[channel]) return;

  if (!handlers[channel][action]) return;

  handlers[channel][action] = handlers[channel][action].filter(function (h) {
    return h !== handler;
  });

  if (handlers[channel][action].length === 0) delete handlers[channel][action];

  if (Object.keys(handlers[channel]).length === 0) delete handlers[channel];
};

var handleMessage = function handleMessage(data) {

  if (!handlers[data.channel]) return;

  if (!handlers[data.channel][data.action]) return;

  handlers[data.channel][data.action].map(function (handler) {
    return handler(data.data);
  });
};

var createCallback = function createCallback(store, action, client, namespace, command) {
  var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var onSuccess = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;


  return function (success) {

    if (success) {

      if (action.success) {

        coerceArray(action.success).map(function (requestAction) {
          store.dispatch({
            type: withNamespace(namespace, requestAction)
          });
        });
      }

      if (onSuccess) onSuccess();
    } else {

      if (action.failure) {

        coerceArray(action.failure).map(function (failureAction) {
          store.dispatch({
            type: withNamespace(namespace, failureAction)
          });
        });
      }
    }
  };

  if (action.request) {

    coerceArray(action.request).map(function (requestAction) {
      store.dispatch({
        type: withNamespace(namespace, requestAction),
        command: command,
        data: data
      });
    });
  }
};

var coerceArray = function coerceArray(value) {
  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var withNamespace = function withNamespace(namespace, type) {
  return namespace ? namespace + '/' + type : type;
};

exports.default = reduxSocketIo;