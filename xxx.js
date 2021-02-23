const logslot = require('./');
logslot('myapp.test.one').error('some error', { extraThings: 1 });
logslot('myapp.test.one').warn('a warning', { extraThings: 2 });
logslot('myapp.test.one').info('for your info', { extraThings: 3 });
logslot('myapp.test.one').verbose('lots of detail', { extraThings: 4 });
logslot('myapp.test.one').debug('for the devs', { a: 1, b: 2 });
logslot('myapp.test.two').info('different namespace', { extraThings: 10 });
