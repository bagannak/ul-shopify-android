export const dockerConfig = {
  logLevel: 'error',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  bail: 0,
  waitforTimeout: 30000,
  hostname: 'localhost',
  port: 4446,
  path: '/wd/hub',
  services: ['docker'],
  dockerLogs: './dockerlogs',
  dockerOptions: {
    healthCheck: 'http://localhost:4446',
  },
  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: [
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
      ],
    },
  },
};
