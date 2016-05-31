'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _Activity = require('../Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _ampConsulLib = require('amp-consul-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

function sleep(delayInSeconds) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, delayInSeconds * 1000);
  });
}

function consulHealthCheck() {
  return new Promise(function(resolve, reject) {
    _unirest2.default.get('http://consul:8500/v1/health/checks/consul').end(function(response) {
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
  var _this = this;

  var consul = new _ampConsulLib.Consul();

  before('Wait for consul', function _callee(done) {
    var success, i;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.timeout(10 * 1000);

            success = false;
            i = 0;

          case 3:
            if (!(i < 10)) {
              _context.next = 18;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return regeneratorRuntime.awrap(consulHealthCheck());

          case 7:
            success = true;
            return _context.abrupt('break', 18);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](4);
            _context.next = 15;
            return regeneratorRuntime.awrap(sleep(1));

          case 15:
            i++;
            _context.next = 3;
            break;

          case 18:

            if (success) {
              done();
            } else {
              done('Timed out waiting for consul');
            }

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this, [[4, 11]]);
  });

  it('details should be available in consul after creation', function _callee2(done) {
    var data, activity, value;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = { test: 'data' };
            _context2.next = 4;
            return regeneratorRuntime.awrap(_Activity2.default.newActivity('test'));

          case 4:
            activity = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(activity.save(data));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(consul.get(activity.id));

          case 9:
            value = _context2.sent;

            expect(JSON.parse(value.Value).data).to.deep.equal(data);
            done();
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](0);

            done(_context2.t0);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, _this, [[0, 14]]);
  });
});