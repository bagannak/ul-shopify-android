import { JsonReaderHelper, Constants } from '../../webservicesExport';
import { BasicConfig } from '../basicConfig';
// const basicConfigFilePath: string = Constants.basicConfigFilePath;
const apkName = JsonReaderHelper.readAttribute(`$.${Constants.commandLineArguments.env}.apkName`, BasicConfig);

const apkFilePath = `${Constants.mobileApkFolderPath}/${apkName}`;
export const LocalConfig = {
  // if you guys using appium commandline for starting server then try using cmd
  // appium --base-path /wd/hub
  // change hostname to 0.0.0.0 if in case doesn't work for localhost
  // we tried appium desktop version 1.21.0
  hostname: 'localhost',
  port: 4723,
  path: '/wd/hub',
  logLevel: 'error',
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          relaxedSecurity: true,
          platformName: 'Android',
          allowInsecure: 'chromedriver_autodownload',
        },
      },
    ],
  ],
  capabilities: {
    platformName: 'Android',
    'appium:deviceName': 'Pixel 7',
    'appium:app': apkFilePath,
    'appium:automationName': 'UiAutomator2',
    // 'appium:appPackage': 'com.swaglabsmobileapp',
    // 'appium:appActivity': 'com.swaglabsmobileapp.MainActivity',
    // 'appium:appWaitPackage': 'com.android.chrome',
    // 'appium:appWaitActivity': '*.TraderWebAppActivity,*.TwaTraderLauncherActivity,*.TranslucentCustomTabActivity',
    'appium:noReset': false,
    // 'appium:fullReset': true,
    'appium:gpsEnabled': false,
    // 'appium:enforceAppInstall': true,
    'appium:newCommandTimeout': 240,
    'appium:nativeWebScreenshot': true,
    'appium:autoGrantPermissions': true,
    'appium:autoAcceptAlerts': true,
  },
  coloredLogs: false,
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
};
