import { Constants } from '../../webservicesExport';

const dateForReporting = `${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`;

export const lambdaTestWebConfig = {
  logLevel: 'error',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  bail: 0,
  hostname: 'hub.lambdatest.com',
  port: 80,
  waitforTimeout: 30000,
  services: [
    [
      'lambdatest',
      {
        tunnel: false,
        lambdatestOpts: {
          logFile: 'tunnel.log',
        },
      },
    ],
  ],
  automationProtocol: 'webdriver',
  user: Constants.commandLineArguments.cloudUserName,
  key: Constants.commandLineArguments.cloudKey,
  capabilities: {
    'LT:Options': {
      browserName: Constants.commandLineArguments.browser || 'chrome',
      version: 'latest',
      platformName: process.env.HYPEREXECUTE_PLATFORM || 'macOS Monterey',
      build: `TypeScript_Framwwork_Sanity - ${dateForReporting}`,
      name: 'Spec name will be replaced here',
      visual: true,
      console: true,
      network: true,
      project: 'TypeScript Framework',
      w3c: true,
      plugin: 'node_js-webdriverio',
    },
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  framework: 'mocha',
};
