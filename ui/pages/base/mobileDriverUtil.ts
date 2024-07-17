/* eslint import/no-mutable-exports: "off" */
/* eslint no-param-reassign: "off" */

import { Browser, remote, RemoteOptions } from 'webdriverio';
import {
  Constants, JsonReaderHelper, LOGGER, LoggerHelper,
} from '../../../webservicesExport';

/**
 * this module will have common reusable methods for browser
 */
export module MobileDriverUtil {
  // export let loggerHelper: LoggerHelper;
  export const url: string = '';
  const listOfSpecs: string[] = [];

  /**
   * this method will help in setting up driver with some settings
   */
  export async function setupMobileDriver(
    configJson: any,
    specName: string,
    envJsonFilePath?: string|Object,
  ): Promise<Browser<'async'>> {
    let driver: Browser<'async'> = null;
    try {
      // setup logger before even starting the execution
      // setup logger only one time for all parallel executions
      if (!listOfSpecs.includes(specName)) {
        // this.loggerHelper = new LoggerHelper();
        // this.loggerHelper.setupLogger(specName);
        LoggerHelper.setupLogger(specName);
        LOGGER.info(`------RUNNING SUITE: ${specName}------`);
      }

      let EnvJson: any = {};
      // if user passed envjsonfilepath, then load the same
      if (!(envJsonFilePath === undefined || envJsonFilePath === '')) {
        EnvJson = await JsonReaderHelper.readAttribute('$', envJsonFilePath);
        LOGGER.info(`Loaded env json file from -${envJsonFilePath}`);
      } else {
        // loading envs json file from default location
        // EnvJson = DefaultEnvJson;
        LOGGER.info('Loaded env json present within framework');
      }
      // assign spec name to the lambdatest config
      if (Constants.commandLineArguments.platform.includes('lambdatest') && Constants.commandLineArguments.os.includes('android')) configJson.capabilities.name = specName;
      else if (Constants.commandLineArguments.platform.includes('localApp') && Constants.commandLineArguments.os.includes('ios')) configJson.capabilities['lt:options'].name = specName;
      else if (Constants.commandLineArguments.platform.includes('browserstack')) configJson.capabilities.build = specName;

      driver = await remote(configJson as RemoteOptions);

      const environmentToRun: string = Constants.commandLineArguments.env;
      LOGGER.info(`got the ENV as ${environmentToRun} from command line`);
      if (
        !(environmentToRun === undefined || environmentToRun === '')
        && EnvJson[environmentToRun] !== undefined
      ) this.url = EnvJson[environmentToRun].url;
      else {
        LOGGER.error('check environment you have passed seems to be not present within env.json');
        throw new Error(
          'check environment you have passed seems to be not present within env.json',
        );
      }

      LOGGER.info(`Running tests on ${this.url}`);
      return driver;
    } catch (error) {
      if (!(LOGGER === null || LOGGER === undefined)) {
        LOGGER.error(`something wrong while setting driver\n${error.message}`);
        LOGGER.error(error.stack);
      } else {
        console.error(`something wrong while setting driver\n${error.message}`);
        console.error(error.stack);
      }
      if (!(driver === undefined || driver === null)) driver.deleteSession();
      // reject('--------Driver setup failed--------');
      throw new Error(
        `${error.stack}\n--------Driver setup failed(Make sure appium server running)--------`,
      );
    }
  }

  /**
   * close app
   */
  export async function closeApp(driver: Browser<'async'>) {
    try {
      await driver.closeApp();
    } catch (error) {
      LOGGER.error('error while closing mobile app');
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * launch app
   */
  export async function launchApp(driver: Browser<'async'>) {
    try {
      await driver.launchApp();
    } catch (error) {
      LOGGER.error('error while launching mobile app');
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }
}
