'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _Activity = require('../Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _ampConsulLib = require('amp-consul-lib');

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

const expect = _chai2.default.expect;

function sleep(delayInSeconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delayInSeconds * 1000);
  });
}

function consulHealthCheck() {
  return new Promise((resolve, reject) => {
    _unirest2.default.get('http://consul:8500/v1/health/checks/consul').end(response => {
      if (response.error) {
        return reject(response.error);
      }
      if (response.status == 401) {
        return reject('Unauthorized');
      }
      resolve();
    });
  });
}

describe('Activity', function() {
  const consul = new _ampConsulLib.Consul();

  before('Wait for consul', (() => {
    var ref = _asyncToGenerator(function*(done) {
      this.timeout(10 * 1000);

      let success = false;
      for (let i = 0; i < 10; i++) {
        try {
          yield consulHealthCheck();
          success = true;
          break;
        } catch (err) {
          // Ignore error and wait
          yield sleep(1);
        }
      }

      if (success) {
        done();
      } else {
        done('Timed out waiting for consul');
      }
    });

    return function(_x) {
      return ref.apply(this, arguments);
    };
  })());

  it('details should be available in consul after creation', (() => {
    var ref = _asyncToGenerator(function*(done) {
      try {
        const data = { test: 'data' };
        const activity = yield _Activity2.default.newActivity('test');
        yield activity.save(data);
        const value = yield consul.get(activity.id);
        expect(JSON.parse(value.Value).data).to.deep.equal(data);
        done();
      } catch (err) {
        done(err);
      }
    });

    return function(_x2) {
      return ref.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=index.js.map