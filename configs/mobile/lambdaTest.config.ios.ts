import { Constants, JsonReaderHelper } from '../../webservicesExport';
import { BasicConfig } from '../basicConfig';

const dateForReporting = `${new Date().toLocaleDateString('en-IN', { year: '2-digit', month: 'short', day: 'numeric' })}`;

// let dateForReportingWithTime=`${new Date().toLocaleDateString('en-IN', {
//   year: '2-digit', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata',
// })}`;

const appUrlFromPipeline = process.env.APP_URL;
let appCloudUrl = JsonReaderHelper.readAttribute(`$.${Constants.commandLineArguments.env}.appCloudUrl`, BasicConfig);

// if app url passed from pipeline then pick that url
// else it will picked up from the config file
appCloudUrl = (appUrlFromPipeline === undefined || appUrlFromPipeline === '') ? appCloudUrl : appUrlFromPipeline;

export const LambdaTestConfigIos = {

  // protocol: 'https',
  hostname: 'mobile-hub.lambdatest.com',
  port: 80,
  path: '/wd/hub',
  logLevel: 'error',
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          // relaxedSecurity: true,
          platformName: 'ios',
          // allowInsecure: 'chromedriver_autodownload',
        },
      },
    ],
    // ['lambdatest', { tunnel: true }],
  ],
  capabilities: {
    // 'appium:deviceName': 'iPhone 13',
    // 'appium:platformVersion': '16',
    // 'appium:orientation': 'PORTRAIT',
    // 'appium:automationName': 'XCUITest',

    'lt:options': {
      w3c: true,
      user: Constants.commandLineArguments.cloudUserName,
      accessKey: Constants.commandLineArguments.cloudKey,
      build: `Sanity - ${dateForReporting}`,
      name: 'Spec name will be replaced here',
      deviceName: 'iPhone 14 Plus',
      platformVersion: '16',
      platformName: 'ios',
      app: appCloudUrl,
      // noReset: false,
      // visual: true,
      // video: true,
      // region: 'eu',
      isRealMobile: true,
      // autoGrantPermissions: true,
      // autoAcceptAlerts: true,
      // appiumVersion: '2.0',
      // devicelog: true,
      // network: true,
      // appProfiling: true,
    },
  },
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
};
