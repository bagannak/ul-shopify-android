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

export const LambdaTestConfig = {

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
          relaxedSecurity: true,
          platformName: 'Android',
          allowInsecure: 'chromedriver_autodownload',
        },
      },
    ],
    // ['browserstack', { browserstacklocal: false }],
  ],
  capabilities: {
    build: `Sanity - ${dateForReporting}`,
    name: 'Spec name will be replaced here',
    user: Constants.commandLineArguments.cloudUserName,
    accessKey: Constants.commandLineArguments.cloudKey,
    app: appCloudUrl,
    platformName: 'android',
    // automationName: 'uiautomator2',
    // appPackage: 'com.nc.trader',
    // appActivity: 'com.nc.trader.SplashScreenActivity',
    // appWaitPackage: 'com.android.chrome',
    // appWaitActivity: '*.TraderWebAppActivity,*.TwaTraderLauncherActivity,*.TranslucentCustomTabActivity',
    noReset: false,
    nativeWebScreenshot: true,
    // Specify device and os_version for testing
    deviceName: 'Galaxy.*',
    region: 'eu',
    platformVersion: '10',
    isRealMobile: true,
    autoGrantPermissions: true,
    autoAcceptAlerts: true,
    appiumVersion: '2.0',
    devicelog: true,
    network: true,
    appProfiling: true,
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
