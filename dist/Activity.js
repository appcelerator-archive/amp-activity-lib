'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      defineProperties(Constructor, staticProps);
    }
    return Constructor;
  };
}();

var _ampConsulLib = require('amp-consul-lib');

var _ramda = require('ramda');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Activity = function() {
  _createClass(Activity, null, [{
    key: 'newActivity',
    value: function newActivity(name) {
      var activity;
      return regeneratorRuntime.async(function newActivity$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              activity = new Activity();

              activity.name = name;
              _context.next = 4;
              return regeneratorRuntime.awrap(getNewActivityID());

            case 4:
              activity.id = _context.sent;
              return _context.abrupt('return', activity);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'fromID',
    value: function fromID(id) {
      var activity;
      return regeneratorRuntime.async(function fromID$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              activity = new Activity();

              activity.id = id;

              // TODO implement
              /*
               let { state, name } = await getActivity(id)
               activity.state = state
               activity.name = name
               */
              return _context2.abrupt('return', activity);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  function Activity() {
    _classCallCheck(this, Activity);

    this.data = {};
    this.consul = new _ampConsulLib.Consul();
  }

  _createClass(Activity, [{
    key: 'save',
    value: function save(data) {
      return regeneratorRuntime.async(function save$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.data = (0, _ramda.merge)(this.data, data || {});
              _context3.next = 3;
              return regeneratorRuntime.awrap(this._save(this.id, {
                name: this.name,
                state: this.state,
                data: this.data
              }));

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'saveState',
    value: function saveState(state, data) {
      return regeneratorRuntime.async(function saveState$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.state = state;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this._save(data));

            case 3:
              return _context4.abrupt('return', _context4.sent);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_save',
    value: function _save(id, value) {
      return regeneratorRuntime.async(function _save$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.consul.set(id, JSON.stringify(value)));

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Activity;
}();

exports.default = Activity;


function getNewActivityID() {
  return new Promise(function(resolve, reject) {
    try {
      // TODO this will be replaced by a flake id
      resolve(_uuid2.default.v1());
    } catch (err) {
      reject(err);
    }
  });
}