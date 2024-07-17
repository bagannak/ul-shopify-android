import { JsonReaderHelper } from '../../webservicesExport';
import { BasicConfig } from '../basicConfig';
import { Constants } from '../constants';

const appUrlFromPipeline = process.env.APP_URL;
let appCloudUrl = JsonReaderHelper.readAttribute(`$.${Constants.commandLineArguments.env}.appCloudUrl`, BasicConfig);

// if app url passed from pipeline then pick that url, else it will picked up from the config file
appCloudUrl = (appUrlFromPipeline === undefined || appUrlFromPipeline === '') ? appCloudUrl : appUrlFromPipeline;

let CAPABILITY = null;

const ANDROID_CAPABILITY = {
  os_version: '11.0',
  device: 'Google Pixel 5',
};

const IOS_CAPABILITY = {
  os_version: '17.2',
  device: 'iPhone 15 Plus',
};

CAPABILITY = Constants.commandLineArguments.os === 'android' ? ANDROID_CAPABILITY : IOS_CAPABILITY;

export const BrowserStackConfig = {
  hostname: 'hub-cloud.browserstack.com',
  path: '/wd/hub',
  logLevel: 'error',
  services: [
    'browserstack',
  ],
  capabilities: {
    ...CAPABILITY,
    app: appCloudUrl,
    'browserstack.appium_version': '1.22.0',
    'browserstack.networkLogs': 'true',
    'browserstack.user': Constants.commandLineArguments.cloudUserName,
    'browserstack.key': Constants.commandLineArguments.cloudKey,
    project: 'TypeScript Framework',
    build: 'your spec name',
  },
  coloredLogs: true,
  deprecationWarnings: true,
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
};
