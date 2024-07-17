import path from 'path';
import { Constants } from '../constants';

const BROWSER = Constants.commandLineArguments.browser;
const HEADLESS = Constants.commandLineArguments.headless;
const IMPLICIT_TIMEOUT = Constants.commandLineArguments.implicitTimeout;

const CHROME_CAPABILITY = {
  browserName: 'chrome',
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: HEADLESS === 'true' ? ['--headless', '--disable-gpu'] : ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
    prefs: {
      'profile.managed_default_content_settings.popups': 2,
      'profile.managed_default_content_settings.notifications': 2,
      'download.default_directory': path.join(process.cwd(), 'tempDownload'),
    },
  },
};

const FIREFOX_CAPABILITY = {
  browserName: 'firefox',
  'moz:firefoxOptions': {
    args: HEADLESS === 'true' ? ['-headless'] : [],
  },
};

const SAFARI_CAPABILITY = {
  browserName: 'safari',
};

const getCapabilities = () => {
  switch (BROWSER) {
    case 'chrome':
      return CHROME_CAPABILITY;
    case 'firefox':
      return FIREFOX_CAPABILITY;
    case 'safari':
      return SAFARI_CAPABILITY;
    default:
      return CHROME_CAPABILITY;
  }
};

export const localConfig = {
  logLevel: 'error',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  bail: 0,
  waitforTimeout: IMPLICIT_TIMEOUT ?? 30000,
  automationProtocol: 'webdriver',
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub',
  capabilities: getCapabilities(),
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  framework: 'mocha',
};
