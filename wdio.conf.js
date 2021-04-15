
const path = require('path');

const fs = require('fs');
function encode(file) {
  var stream = fs.readFileSync(file);
  return new Buffer.from(stream).toString('base64');
}

const { config } = require('./wdio.shared.conf');

config.capabilities = [
    {
        maxInstances: 5,
        // browserName: 'chrome',
        // 'goog:chromeOptions': {
        //     extensions: [(function () {
        //         try {
        //             const webExt = encode(path.resolve(__dirname, './cextension.crx'))
        //             return webExt;
        //         } catch (e) {
        //             console.log(e, 'An error occurred while to parse extension file!');
        //         }
        //     })()],
        //     // to run chrome headless the following flags are required
        //     // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        //     // args: ['--headless', '--disable-gpu'],
        // },
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['--headless'],
        },
        //
        // Parameter to ignore some or all default flags
        // - if value is true: ignore all DevTools 'default flags' and Puppeteer 'default arguments'
        // - if value is an array: DevTools filters given default arguments
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }
]

exports.config = config;