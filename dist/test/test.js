'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _GitHubUser = require('../lib/GitHubUser');

var _GitHubUser2 = _interopRequireDefault(_GitHubUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WARNING: don't use arrow functions with mocha describe(), it(),
// and all the other standard mocha functions that take callbacks
// if you want to be able to use `this.timeout()`. Because of the way
// arrow functions work, the `this` context will be the module, not
// the mocha context in the callback. Even if you don't anticipate
// needing access to the mocha `this` context in the callbacks, it's
// best to use full `function()` syntax for the mocha functions.

describe('tests', function () {

  // This is an auto-generated sample test to demo testing async functions
  it('should fetch GitHub user details for "subfuzion"', function _callee() {
    var login, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            login = 'subfuzion';
            _context.next = 3;
            return regeneratorRuntime.awrap(_GitHubUser2.default.fetchDetails(login));

          case 3:
            user = _context.sent;

            (0, _assert2.default)(user);
            _assert2.default.equal(user.login, login);
            _assert2.default.equal(user.name, 'Tony Pujals');
            _assert2.default.equal(user.blog, 'https://twitter.com/subfuzion');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  });
});