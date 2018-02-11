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

    case 'JOIN_REQUEST':
    case 'LEAVE_REQUEST':
    case 'MESSAGE_REQUEST':
      return _extends({}, state, {
        log: [].concat(_toConsumableArray(state.log), [_extends({
          type: 'REQUEST'
        }, action.request)])
      });

    case 'JOIN_SUCCESS':
    case 'LEAVE_SUCCESS':
    case 'MESSAGE_SUCCESS':
      return _extends({}, state, {
        log: [].concat(_toConsumableArray(state.log), [_extends({
          type: 'RESULT'
        }, action.result)])
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

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = __webpack_require__(117);

var actions = _interopRequireWildcard(_actions);

var _reactRedux = __webpack_require__(32);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas() {
    _classCallCheck(this, Canvas);

    return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
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
              { className: 'form-inline', onSubmit: this._handleJoin.bind(this) },
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Channel', ref: function ref(node) {
                    return _this2.joinChannel = node;
                  } })
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-block btn-primary' },
                  'Join'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-12 text-center' },
            _react2.default.createElement(
              'form',
              { className: 'form-inline', onSubmit: this._handleLeave.bind(this) },
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Channel', ref: function ref(node) {
                    return _this2.leaveChannel = node;
                  } })
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-block btn-primary' },
                  'Leave'
                )
              )
            )
          )
        ),
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
                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Channel', ref: function ref(node) {
                    return _this2.messageChannel = node;
                  } })
              ),
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
            _react2.default.createElement(
              'table',
              { className: 'table table-bordered table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    null,
                    'TYPE'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'CHANNEL'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'RESULT'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'DATA'
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                log.map(function (row, index) {
                  return _react2.default.createElement(
                    'tr',
                    { key: 'row_' + index },
                    _react2.default.createElement(
                      'td',
                      null,
                      row.type
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      row.channel
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      JSON.stringify(row.meta)
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      JSON.stringify(row.data)
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }, {
    key: '_handleJoin',
    value: function _handleJoin(e) {
      e.preventDefault();
      this.props.onJoin(this.joinChannel.value);
    }
  }, {
    key: '_handleLeave',
    value: function _handleLeave(e) {
      e.preventDefault();
      this.props.onLeave(this.leaveChannel.value);
    }
  }, {
    key: '_handleMessage',
    value: function _handleMessage(e) {
      e.preventDefault();
      var data = {
        action: 'message',
        text: this.messageText.value
      };
      this.props.onMessage(this.messageChannel.value, data);
    }
  }]);

  return Canvas;
}(_react2.default.Component);

Canvas.propTypes = {
  log: _propTypes2.default.array,
  onJoin: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  onAction: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    log: state.log
  };
};

var mapDispatchToProps = {
  onJoin: actions.join,
  onLeave: actions.leave,
  onMessage: actions.message,
  onAction: actions.action
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Canvas);

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var join = exports.join = function join(channel) {
  return {
    type: 'SOCKET_JOIN',
    channel: channel,
    request: 'JOIN_REQUEST',
    success: 'JOIN_SUCCESS',
    failure: 'JOIN_FAILURE'
  };
};

var leave = exports.leave = function leave(channel) {
  return {
    type: 'SOCKET_LEAVE',
    channel: channel,
    request: 'LEAVE_REQUEST',
    success: 'LEAVE_SUCCESS',
    failure: 'LEAVE_FAILURE'
  };
};

var message = exports.message = function message(channel, data) {
  return {
    type: 'SOCKET_MESSAGE',
    channel: channel,
    data: data,
    request: 'MESSAGE_REQUEST',
    success: 'MESSAGE_SUCCESS',
    failure: 'MESSAGE_FAILURE'
  };
};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _root = __webpack_require__(61);

var _root2 = _interopRequireDefault(_root);

var _canvas = __webpack_require__(116);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _react2.default.createElement(
  _root2.default,
  null,
  _react2.default.createElement(_canvas2.default, null)
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

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(27);

var _reactRedux = __webpack_require__(32);

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

var actionTypes = ['SOCKET_JOIN', 'SOCKET_LEAVE', 'SOCKET_MESSAGE'];

var reduxSocketIo = function reduxSocketIo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var socketUrl = options.url || options.protocol + '//' + options.hostname + ':' + options.port;

  var client = options.client || (0, _socket2.default)(socketUrl);

  return function (store) {
    return function (next) {
      return function (action) {
        var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
            _action$type$match2 = _slicedToArray(_action$type$match, 3),
            namespace = _action$type$match2[1],
            type = _action$type$match2[2];

        if (!_lodash2.default.includes(actionTypes, type)) return next(action);

        if (action.type === 'SOCKET_JOIN') {

          request(store, action, client, namespace, 'join');
        } else if (action.type === 'SOCKET_LEAVE') {

          request(store, action, client, namespace, 'leave');
        } else if (action.type === 'SOCKET_MESSAGE') {

          request(store, action, client, namespace, 'message');
        }
      };
    };
  };
};

var request = function request(store, action, client, namespace, command) {

  var token = 'fesbsdfjbfse68r3jhadwkhuda';

  var request = {
    channel: action.channel,
    data: action.data
  };

  var callback = function callback(result) {

    if (result.meta.success) {

      if (action.success) {

        coerceArray(action.success).map(function (requestAction) {
          store.dispatch({
            type: withNamespace(namespace, requestAction),
            result: result
          });
        });
      }

      if (action.onSuccess) action.onSuccess(result);
    } else {

      if (action.failure) {

        coerceArray(action.failure).map(function (failureAction) {
          store.dispatch({
            type: withNamespace(namespace, failureAction),
            result: result
          });
        });
      }

      if (action.onFailure) action.onFailure(result);
    }
  };

  if (action.request) {
    coerceArray(action.request).map(function (requestAction) {
      store.dispatch({
        type: withNamespace(namespace, requestAction),
        request: request
      });
    });
  }

  client.emit(command, token, request, callback);
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