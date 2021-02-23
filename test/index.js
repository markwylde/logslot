const test = require('basictap');
const stripAnsi = require('strip-ansi');

const logslot = require('../');

let consoleLogs = [];
function logSpy (...args) {
  consoleLogs.push(args);
  console.log(...args);
}
logslot.setLogger(logSpy);

function reset () {
  logslot('logging anything to set').info('the last namespace to this');
  consoleLogs = [];
  delete process.env.SEATAXI_LOGS;
}

test('json - works', t => {
  t.plan(1);

  reset();

  logslot('one').info('this is a test');

  t.equal(consoleLogs[0][0].slice(24), '","one","INFO","this is a test"]');
});

test('json - works with extra', t => {
  t.plan(1);

  reset();

  logslot('one').info('this is a test', { a: 1 });

  t.equal(consoleLogs[0][0].slice(24), '","one","INFO","this is a test",{"a":1}]');
});

test('pretty - is color coded', t => {
  t.plan(3);

  reset();

  process.env.SEATAXI_LOGS = 'pretty';

  logslot('one').info('this is a test');

  t.equal(consoleLogs[0][1], '\x1b[38;5;200;1mone                  \x1b[0m', 'should equal the correct message');
  t.equal(consoleLogs[1][1], '\x1B[36m  INFO\x1B[39m', 'should equal the correct level');
  t.equal(consoleLogs[1][2], 'this is a test', 'should equal the correct level');
});

test('pretty - works', t => {
  t.plan(2);

  reset();

  process.env.SEATAXI_LOGS = 'pretty';

  logslot('one').info('this is a test');

  t.equal(stripAnsi(consoleLogs[0][1]), 'one                  ', 'should equal the correct message');
  t.equal(stripAnsi(consoleLogs[1][1]), '  INFO', 'should equal the correct level');
});

test('pretty - works with extra', t => {
  t.plan(4);

  reset();

  process.env.SEATAXI_LOGS = 'pretty';

  logslot('one').info('this is a test', { a: 1 });

  t.equal(stripAnsi(consoleLogs[0][1]), 'one                  ', 'should equal the correct message');
  t.equal(stripAnsi(consoleLogs[1][1]), '  INFO', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[1][2]), 'this is a test', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[2][0]), '                           {"a":1}', 'should include the extra detail');
});
