'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ampConsulLib = require('amp-consul-lib');

var _ramda = require('ramda');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function(value) { return step("next", value); }, function(err) { return step("throw", err); }); }
      }

      return step("next");
    });
  };
}

class Activity {
  static newActivity(name) {
    return _asyncToGenerator(function*() {
      let activity = new Activity();
      activity.name = name;
      activity.id = yield getNewActivityID();
      return activity;
    })();
  }

  static fromID(id) {
    return _asyncToGenerator(function*() {
      let activity = new Activity();
      activity.id = id;

      // TODO implement
      /*
       let { state, name } = await getActivity(id)
       activity.state = state
       activity.name = name
       */
      return activity;
    })();
  }

  constructor() {
    this.data = {};
    this.consul = new _ampConsulLib.Consul();
  }

  save(data) {
    var _this = this;

    return _asyncToGenerator(function*() {
      _this.data = (0, _ramda.merge)(_this.data, data || {});
      yield _this._save(_this.id, {
        name: _this.name,
        state: _this.state,
        data: _this.data
      });
    })();
  }

  saveState(state, data) {
    var _this2 = this;

    return _asyncToGenerator(function*() {
      _this2.state = state;
      return yield _this2._save(data);
    })();
  }

  _save(id, value) {
    var _this3 = this;

    return _asyncToGenerator(function*() {
      // TODO: spec key-value space schema
      yield _this3.consul.set(id, JSON.stringify(value));
    })();
  }
}

exports.default = Activity;
function getNewActivityID() {
  return new Promise((resolve, reject) => {
    try {
      // TODO this will be replaced by a flake id
      resolve(_uuid2.default.v1());
    } catch (err) {
      reject(err);
    }
  });
}
//# sourceMappingURL=Activity.js.map