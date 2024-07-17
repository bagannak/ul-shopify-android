import { Constants } from '../../webservicesExport';

export const browserstackWebConfig = {
  logLevel: 'error',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  bail: 0,
  port: 80,
  waitforTimeout: 30000,
  protocol: 'http',
  services: [
    [
      'browserstack',
    ],
  ],
  automationProtocol: 'webdriver',
  user: Constants.commandLineArguments.cloudUserName,
  key: Constants.commandLineArguments.cloudKey,
  capabilities: {
    browserName: Constants.commandLineArguments.browser,
    browser_version: 'latest',
    os: 'Windows',
    os_version: '10',
    resolution: '1920x1080',
    'browserstack.local': 'false',
    'browserstack.debug': 'true',
    'browserstack.networkLogs': 'true',
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  framework: 'mocha',
};
