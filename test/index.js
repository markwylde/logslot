import test from 'basictap';
import stripAnsi from 'strip-ansi';

import chalk from 'chalk';

import logslot from '../index.js';
import formatDate from '../formatDate.js';

chalk.level = 3;

const dateEndOffset = formatDate().length + 2;
const dateEndSpaces = Array(dateEndOffset + 12).fill('').join(' ');

let consoleLogs = [];
function logSpy (...args) {
  consoleLogs.push(args);
  console.log(...args);
}
logslot.setLogger(logSpy);

function reset () {
  logslot.setLogLevel('info');
  logslot('logging anything to set').info('the last namespace to this');
  consoleLogs = [];
  delete process.env.LOGSLOT_FORMAT;
}

test('log level - default', t => {
  t.plan(1);

  reset();

  logslot('one').debug('should not appear');
  logslot('one').info('should appear');

  t.equal(consoleLogs[0][0].slice(dateEndOffset), '","one","INFO","should appear"]');
});

test('log level - custom', t => {
  t.plan(2);

  reset();
  logslot.setLogLevel('debug');

  logslot('one').debug('should appear');
  logslot('one').info('should also appear');

  t.equal(consoleLogs[0][0].slice(dateEndOffset), '","one","DEBUG","should appear"]');
  t.equal(consoleLogs[1][0].slice(dateEndOffset), '","one","INFO","should also appear"]');
});

test('json - works', t => {
  t.plan(1);

  reset();

  logslot('one').info('this is a test');

  t.equal(consoleLogs[0][0].slice(dateEndOffset), '","one","INFO","this is a test"]');
});

test('json - works with extra', t => {
  t.plan(1);

  reset();

  logslot('one').info('this is a test', { a: 1 });

  t.equal(consoleLogs[0][0].slice(dateEndOffset), '","one","INFO","this is a test",{"a":1}]');
});

test('pretty - is color coded', t => {
  t.plan(3);

  reset();

  process.env.LOGSLOT_FORMAT = 'pretty';

  logslot('one').info('this is a test');

  t.equal(consoleLogs[0][1], '\x1b[38;5;200;1mone                  \x1b[0m', 'should equal the correct message');
  t.equal(consoleLogs[1][2], '\x1B[36mINFO   \x1B[39m', 'should equal the correct level');
  t.equal(consoleLogs[1][3], 'this is a test', 'should equal the correct level');
});

test('pretty - works', t => {
  t.plan(2);

  reset();

  process.env.LOGSLOT_FORMAT = 'pretty';

  logslot('one').info('this is a test');

  t.equal(stripAnsi(consoleLogs[0][1]), 'one                  ', 'should equal the correct message');
  t.equal(stripAnsi(consoleLogs[1][2]), 'INFO   ', 'should equal the correct level');
});

test('pretty - works with extra', t => {
  t.plan(4);

  reset();

  process.env.LOGSLOT_FORMAT = 'pretty';

  logslot('one').info('this is a test', { a: 1 });

  t.equal(stripAnsi(consoleLogs[0][1]), 'one                  ', 'should equal the correct message');
  t.equal(stripAnsi(consoleLogs[1][2]), 'INFO   ', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[1][3]), 'this is a test', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[2][0]), `${dateEndSpaces}{"a":1}`, 'should include the extra detail');
});

test('pretty - works with large extra', t => {
  t.plan(4);

  reset();

  process.env.LOGSLOT_FORMAT = 'pretty';

  logslot('one').info('this is a test', { a: 1, b: 2, c: 3, d: 4 });

  t.equal(stripAnsi(consoleLogs[0][1]), 'one                  ', 'should equal the correct message');
  t.equal(stripAnsi(consoleLogs[1][2]), 'INFO   ', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[1][3]), 'this is a test', 'should equal the correct level');
  t.equal(stripAnsi(consoleLogs[2][0]), `${dateEndSpaces}{\n${dateEndSpaces}  "a": 1,\n${dateEndSpaces}  "b": 2,\n${dateEndSpaces}  "c": 3,\n${dateEndSpaces}  "d": 4\n${dateEndSpaces}}`, 'should include the extra detail');
});
