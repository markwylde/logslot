const logslot = require('./');

logslot('myapp:test:one').error('some error');
logslot('myapp:test:one').warn('a warning');
logslot('myapp:test:one').info('for your info');
logslot('myapp:test:two').verbose('lots of detail');
logslot('myapp:test:two').debug('for the devs', { a: 1, b: 2 });
logslot('myapp:test:two').info('different namespace', { extraThings: 10 });
