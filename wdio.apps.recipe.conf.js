const { join } = require('path');
const { config } = require('./wdio.conf');
const configConst = require('./config');

function getAppPath (fileName) {
    return join(process.cwd(), './apps/' + fileName);
}

// ============
// Specs
// ============
config.specs = [
    './test/specs/rakuten_2_recipe.ts',
];

let capabilities = [
    {
        ...config.capabilities[0],
        'appium:app': getAppPath(configConst.default.RAKUTEN_RECIPE_APK_NAME),
    }
];
delete capabilities[0]['appium:otherApps'];
config.capabilities = capabilities;

exports.config = config;