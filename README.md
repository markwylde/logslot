# logslot
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/logslot)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/logslot)](https://github.com/markwylde/logslot/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/logslot)](https://github.com/markwylde/logslot/blob/master/LICENSE)

A tiny logger that outputs json at runtime and pretty logs during development

## Example Usage
```javascript
const logslot = require('logslot');
logslot('myapp.test.name.space').info('this is a test', { extra: 1, more: 2 })

/*
  OUTPUTS:
  23/02/2021 10:04:11 pm myapp.test.name.space                  
  23/02/2021 10:04:11 pm   INFO this is a test
                             {
                                extra: 1,
                                more: 2
                             }
*/
```

## License
This project is licensed under the terms of the MIT license.
