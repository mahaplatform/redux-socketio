webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INITIAL_STATE = {
  log: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {

    case 'MESSAGE':
      return _extends({}, state, {
        log: [].concat(_toConsumableArray(state.log), [action.message])
      });

    default:
      return state;
  }
};

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = __webpack_require__(117);

var actions = _interopRequireWildcard(_actions);

var _reactRedux = __webpack_require__(17);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Network = function (_React$Component) {
  _inherits(Network, _React$Component);

  function Network() {
    _classCallCheck(this, Network);

    return _possibleConstructorReturn(this, (Network.__proto__ || Object.getPrototypeOf(Network)).apply(this, arguments));
  }

  _createClass(Network, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        network: {
          subscribe: this._handleSubscribe.bind(this),
          unsubscribe: this._handleUnsubscribe.bind(this),
          message: this._handleMessage.bind(this)
        }
      };
    }
  }, {
    key: '_handleSubscribe',
    value: function _handleSubscribe(channel, action, handler) {
      this.props.onSubscribe(channel, action, handler);
    }
  }, {
    key: '_handleUnsubscribe',
    value: function _handleUnsubscribe(channel, action, handler) {
      this.props.onUnsubscribe(channel, action, handler);
    }
  }, {
    key: '_handleMessage',
    value: function _handleMessage(channel, action, message) {
      this.props.onMessage(channel, action, message);
    }
  }]);

  return Network;
}(_react2.default.Component);

Network.childContextTypes = {
  network: _propTypes2.default.object
};
Network.propTypes = {
  log: _propTypes2.default.array,
  onJoin: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  onAction: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {
  onSubscribe: actions.subscribe,
  onUnsubscribe: actions.unsubscribe,
  onMessage: actions.message
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Network);

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var subscribe = exports.subscribe = function subscribe(channel, action, handler) {
  return {
    type: 'SOCKETIO_SUBSCRIBE',
    channel: channel,
    action: action,
    handler: handler,
    request: 'SUBSCRIBE_REQUEST',
    success: 'SUBSCRIBE_SUCCESS',
    failure: 'SUBSCRIBE_FAILURE'
  };
};

var unsubscribe = exports.unsubscribe = function unsubscribe(channel, action, handler) {
  return {
    type: 'SOCKETIO_UNSUBSCRIBE',
    channel: channel,
    action: action,
    handler: handler,
    request: 'UNSUBSCRIBE_REQUEST',
    success: 'UNSUBSCRIBE_SUCCESS',
    failure: 'UNSUBSCRIBE_FAILURE'
  };
};

var message = exports.message = function message(channel, action, _message) {
  return {
    type: 'SOCKETIO_MESSAGE',
    channel: channel,
    action: action,
    message: _message,
    request: 'MESSAGE_REQUEST',
    success: 'MESSAGE_SUCCESS',
    failure: 'MESSAGE_FAILURE'
  };
};

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = __webpack_require__(119);

var actions = _interopRequireWildcard(_actions);

var _reactRedux = __webpack_require__(17);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Canvas);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call.apply(_ref, [this].concat(args))), _this), _this._handleReceiveMessage = _this._handleReceiveMessage.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Canvas, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var log = this.props.log;

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-12 text-center' },
            _react2.default.createElement(
              'form',
              { className: 'form-inline', onSubmit: this._handleMessage.bind(this) },
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Message', ref: function ref(node) {
                    return _this2.messageText = node;
                  } })
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-block btn-primary' },
                  'Send'
                )
              )
            ),
            log.map(function (row, index) {
              return _react2.default.createElement(
                'div',
                { key: 'row_' + index },
                row.text
              );
            })
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.network.subscribe('chat', 'message', this._handleReceiveMessage);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount(e) {
      this.context.network.unsubscribe('chat', 'message', this._handleReceiveMessage);
    }
  }, {
    key: '_handleReceiveMessage',
    value: function _handleReceiveMessage(message) {
      this.props.onMessage(message);
    }
  }, {
    key: '_handleMessage',
    value: function _handleMessage(e) {
      e.preventDefault();
      var message = {
        text: this.messageText.value
      };
      this.context.network.message('chat', 'message', message);
    }
  }]);

  return Canvas;
}(_react2.default.Component);

Canvas.contextTypes = {
  network: _propTypes2.default.object
};
Canvas.propTypes = {
  log: _propTypes2.default.array
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    log: state.log
  };
};

var mapDispatchToProps = {
  onMessage: actions.message
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Canvas);

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var message = exports.message = function message(_message) {
  return {
    type: 'MESSAGE',
    message: _message
  };
};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _root = __webpack_require__(61);

var _root2 = _interopRequireDefault(_root);

var _network = __webpack_require__(116);

var _network2 = _interopRequireDefault(_network);

var _canvas = __webpack_require__(118);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _react2.default.createElement(
  _root2.default,
  null,
  _react2.default.createElement(
    _network2.default,
    null,
    _react2.default.createElement(_canvas2.default, null)
  )
);

_reactDom2.default.render(router, document.getElementById('main'));

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(28);

var _reactRedux = __webpack_require__(17);

var _reduxSocketioClient = __webpack_require__(89);

var _reduxSocketioClient2 = _interopRequireDefault(_reduxSocketioClient);

var _reduxThunk = __webpack_require__(113);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(114);

var _reducer = __webpack_require__(115);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    var loggerMiddleware = (0, _reduxLogger.createLogger)({ collapsed: true });

    var socketioClientMiddleware = (0, _reduxSocketioClient2.default)({ url: 'http://localhost:8090' });

    var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware, socketioClientMiddleware)(_redux.createStore);

    _this.store = createStoreWithMiddleware(_reducer2.default);

    return _this;
  }

  _createClass(Root, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        this.props.children
      );
    }
  }]);

  return Root;
}(_react2.default.Component);

Root.propTypes = {
  children: _propTypes2.default.any
};
exports.default = Root;

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _socket = __webpack_require__(90);

var _socket2 = _interopRequireDefault(_socket);

var _lodash = __webpack_require__(112);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

        if (type === 'SOCKETIO_SUBSCRIBE') {

          var callback = function callback() {
            return addHandler(action.channel, action.action, action.handler);
          };

          if (handlers[action.channel]) return callback();

          return request(store, action, client, namespace, 'join', null, callback);
        }

        if (type === 'SOCKETIO_UNSUBSCRIBE') {

          console.log(1);

          if (!_lodash2.default.includes(handlers[action.channel][action.action], action.handler)) return;

          console.log(2);

          removeHandler(action.channel, action.action, action.handler);

          console.log(3);

          if (!handlers[action.channel]) return;

          console.log(4);

          return request(store, action, client, namespace, 'leave');
        }

        if (type === 'SOCKETIO_MESSAGE') {

          var data = {
            channel: action.channel,
            action: action.action,
            message: action.message
          };

          return request(store, action, client, namespace, 'message', data);
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
    return handler(data.message);
  });
};

var request = function request(store, action, client, namespace, command, data, onSuccess) {

  var channel = action.channel || null;

  var token = action.token || null;

  var callback = function callback(success) {

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

  client.emit(command, token, channel, data, callback);
};

var coerceArray = function coerceArray(value) {
  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var withNamespace = function withNamespace(namespace, type) {
  return namespace ? namespace + '/' + type : type;
};

exports.default = reduxSocketIo;

/***/ })

},[49]);