/* eslint import/no-mutable-exports: "off" */
/* eslint no-await-in-loop: "off" */
/* eslint func-names: "off" */
/* eslint no-param-reassign: "off" */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { Browser, remote, RemoteOptions } from 'webdriverio';
import {
  Constants, JsonReaderHelper, LOGGER, LoggerHelper, WaitUtil,
} from '../../../webservicesExport';

/**
 * this module will have common reusable methods for browser
 */
export module BrowserUtil {
  // export let loggerHelper: LoggerHelper;
  export const url: string = '';
  const listOfSpecs: string[] = [];
  const sessionIdAndMainWindowHandle: Map<string, string> = new Map<string, string>();

  /**
   * this method will help in setting up driver with some settings
   */
  export async function setupBrowser(
    configJson: any,
    specName: string,
    envJsonFilePath?: string|Object,
    optURL?: string,
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
        // LOGGER.info(optURL);
      }

      let EnvJson: any = {};
      // if user passed envjsonfilepath, then load the same
      if (!(envJsonFilePath === undefined || envJsonFilePath === '')) {
        EnvJson = JsonReaderHelper.readAttribute('$', envJsonFilePath);
        LOGGER.info(`Loaded env json file from -${envJsonFilePath}`);
      } else {
        // loading envs json file from default location
        // EnvJson = DefaultEnvJson;
        LOGGER.info('Loaded env json present within framework');
      }

      if (Constants.commandLineArguments.platform.includes('lambdatest')) configJson.capabilities['LT:Options'].name = specName;
      else if (Constants.commandLineArguments.platform.includes('browserstack')) configJson.capabilities.build = specName;

      driver = await remote(configJson as RemoteOptions);
      await driver.setWindowSize(1200, 800);
      await driver.setTimeout({ pageLoad: 60000 });
      const environmentToRun: string = Constants.commandLineArguments.env;
      LOGGER.info(`got the ENV as ${environmentToRun} from command line`);
      if (
        !(environmentToRun === undefined || environmentToRun === '')
        && EnvJson[environmentToRun] !== undefined
      ) {
        if (!(optURL === undefined)) {
          this.url = optURL;
        } else {
          this.url = EnvJson[environmentToRun].url;
        }
      } else {
        LOGGER.error('check environment you have passed seems to be not present within env.json');
        throw new Error(
          'check environment you have passed seems to be not present within env.json',
        );
      }

      LOGGER.info(`Running tests on ${this.url}`);
      await driver.navigateTo(this.url);

      if (!sessionIdAndMainWindowHandle.has(driver.sessionId)) {
        sessionIdAndMainWindowHandle.set(driver.sessionId, await driver.getWindowHandle());
        LOGGER.info(
          `------saved parent window handle------${sessionIdAndMainWindowHandle.get(
            driver.sessionId,
          )}`,
        );
      }
      return driver;
    } catch (error) {
      console.error('something wrong while setting driver');
      if (!(LOGGER === null || LOGGER === undefined)) {
        LOGGER.error(`something wrong while setting driver\n${error.message}`);
        LOGGER.error(error.stack);
      } else {
        console.error(`something wrong while setting driver\n${error.message}`);
        console.error(error.stack);
      }
      if (!(driver === undefined || driver === null)) driver.deleteSession();
      // reject('--------Driver setup failed--------');
      throw new Error('--------Driver setup failed--------');
    }
  }

  /**
   * deletes the cookie
   */
  export async function deleteCookies(driver: Browser<'async'>) {
    try {
      await driver.deleteCookies();
    } catch (error) {
      LOGGER.error('error while deleting cookies');
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * deletes the session
   */
  export async function deleteSession(driver: Browser<'async'>) {
    try {
      await driver.deleteSession();
    } catch (error) {
      LOGGER.error('error while deleting cookies');
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * close current window
   */
  export async function closeWindow(driver: Browser<'async'>) {
    try {
      await driver.closeWindow();
    } catch (error) {
      LOGGER.error('error while closing window');
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  export async function open(driver: Browser<'async'>, path: string) {
    try {
      await driver.url(path);
      await driver.pause(3000);
      await driver.acceptAlert();
    } catch (error) {
      LOGGER.error('could not open path url');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get the title of the current window
   */
  export async function getTitle(driver: Browser<'async'>): Promise<string> {
    let title: string;
    try {
      title = await driver.getTitle();
    } catch (error) {
      LOGGER.error('could not get title of the page');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
    return title;
  }

  /**
   * switch to child window
   */
  export async function switchToChildWindow(driver: Browser<'async'>, childWindowId?: string) {
    try {
      const windowHandles: string[] = await driver.getWindowHandles();
      LOGGER.info('below are window handles');
      windowHandles.forEach((windowHandle) => {
        LOGGER.info(windowHandle);
      });
      if (childWindowId === undefined || childWindowId === '') {
        for (let index = 0; index < windowHandles.length; index += 1) {
          if (!(windowHandles[index] === sessionIdAndMainWindowHandle.get(driver.sessionId))) {
            LOGGER.info(`switching to child window handle----${windowHandles[index]}`);
            await driver.switchToWindow(windowHandles[index]);
            break;
          }
        }
      } else {
        LOGGER.info(`switching to child window handle----${childWindowId}`);
        await driver.switchToWindow(childWindowId);
      }
    } catch (error) {
      LOGGER.error('switch to child window was not successful\n');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * switch to child window
   */
  export async function switchToChildWindowWithTitle(driver: Browser<'async'>, title: string) {
    try {
      const windowHandles: string[] = await driver.getWindowHandles();
      LOGGER.info('below are window handles');
      windowHandles.forEach((windowHandle) => {
        LOGGER.info(windowHandle);
      });
      let foundChildWindow:boolean = false;
      for (let index = 0; index < windowHandles.length; index += 1) {
        await driver.switchToWindow(windowHandles[index]);
        const currentTitle:string = await driver.getTitle();
        if (currentTitle === title) {
          foundChildWindow = true;
          LOGGER.info(`Switched to webview with title - ${title}`);
          break;
        }
      }
      if (!foundChildWindow) {
        LOGGER.warn(`Could not find the webview with specified title-${title}, switching to ${windowHandles[0]}`);
        await driver.switchToWindow(windowHandles[0]);
      }
    } catch (error) {
      LOGGER.error('switch to child window was not successful\n');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * switch to frame
   */
   export async function switchToFrame(driver: Browser<'async'>, iFrameLocator: string) :Promise<void>;
   export async function switchToFrame(driver: Browser<'async'>, iFrameLocator: any) :Promise<void> {
     try {
       if (typeof iFrameLocator === 'string') {
         await driver.switchToFrame(await driver.$(iFrameLocator));
       } else {
         await driver.switchToFrame(iFrameLocator);
       }
     } catch (error) {
       LOGGER.error('switch to iframe was not successful\n');
       LOGGER.info(error.stack);
       throw new Error(error);
     }
   }

  /**
   * switch to parent frame
   */
   export async function switchToParentFrame(driver: Browser<'async'>) :Promise<void> {
     try {
       await driver.switchToParentFrame();
     } catch (error) {
       LOGGER.error('switch to parent frame was not successful\n');
       LOGGER.info(error.stack);
       throw new Error(error);
     }
   }

  /**
   * switch to main window
   */
  export async function switchToMainWindow(driver: Browser<'async'>) {
    try {
      const windowHandles: string[] = await driver.getWindowHandles();
      const parentWindow = sessionIdAndMainWindowHandle.get(driver.sessionId);
      LOGGER.info(
        `Window Handles - ${windowHandles}. Switching to Parent Window - ${parentWindow}`,
      );
      await driver.switchToWindow(parentWindow);
    } catch (error) {
      LOGGER.info(`Switching to main Window was not successful. Error : ${error.stack}`);
      throw new Error(`Switching to main Window was not successful. Error : ${error.stack}`);
    }
  }

  /**
   * close all child window and switch to main window
   */
  export async function closeAllChildWindow(driver: Browser<'async'>) {
    try {
      const windowHandles: string[] = await driver.getWindowHandles();
      const parentWindow = sessionIdAndMainWindowHandle.get(driver.sessionId);
      LOGGER.info(
        `Window Handles - ${windowHandles}. Switching to Parent Window - ${parentWindow}`,
      );
      for (let index = 0; index < windowHandles.length; index += 1) {
        const windowHandle = windowHandles[index];
        if (windowHandle !== sessionIdAndMainWindowHandle.get(driver.sessionId)) {
          await driver.switchToWindow(windowHandle);
          await driver.closeWindow();
          await WaitUtil.pause(driver, 200);
          // if any popup shown accept that popup window
          if (
            (await driver.getWindowHandles()).includes(windowHandle)
            && (await driver.isAlertOpen())
          ) {
            await driver.acceptAlert();
            LOGGER.info('popup displayed while closing the window, accepted the popup');
          }
          LOGGER.info(`closed child window-${windowHandle}`);
        }
      }
      LOGGER.info(
        `switching to parent window handle----${sessionIdAndMainWindowHandle.get(driver.sessionId)}`,
      );
      await driver.switchToWindow(sessionIdAndMainWindowHandle.get(driver.sessionId));
    } catch (error) {
      LOGGER.error('close all child window was not successful\n');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * executes the javascript
   * @param js
   */
  export async function executeJavascript(driver: Browser<'async'>, js: string) {
    try {
      await driver.execute(js);
    } catch (error) {
      LOGGER.error('error while executing javascript');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get window handle
   * @param js
   */
  export async function getWindowHandle(driver: Browser<'async'>) {
    let windowHandle: string;
    try {
      windowHandle = await driver.getWindowHandle();
    } catch (error) {
      LOGGER.error('error while executing javascript');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
    return windowHandle;
  }

  /**
   * get window handle
   * @param js
   */
  export async function getWindowHandles(driver: Browser<'async'>) {
    let windowHandles: string[];
    try {
      windowHandles = await driver.getWindowHandles();
    } catch (error) {
      LOGGER.error('error while executing javascript');
      LOGGER.info(error.stack);
      throw new Error(error);
    }
    return windowHandles;
  }

    /**
   * Switch app to home
   * @param js
   */
    export async function switchAppToHome(driver: Browser<'async'>) {
      try {
        const KEYCODE_APP_SWITCH = 187;
        const windowHandles = await BrowserUtil.getWindowHandles(driver);
        LOGGER.info(`Navigating to home Windows handles-${windowHandles}`);
        if (windowHandles.length === 1) await BrowserUtil.switchToChildWindow(driver, windowHandles[0]);
        if (windowHandles.length > 1) {
          await BrowserUtil.switchToChildWindow(driver, windowHandles[0]);
        }
        LOGGER.info('Switching app');
        const homePageHeaderLabel = "//ons-toolbar/div[text()=' Hello! ']";
        let isDisplayed:boolean = false;
        try {
          await driver.$(homePageHeaderLabel).waitForDisplayed({ timeout: 3000 });
          isDisplayed = true;
        } catch (error) {
          isDisplayed = false;
        }
        if (!isDisplayed) {
          await driver.pressKeyCode(KEYCODE_APP_SWITCH);
          await WaitUtil.pause(driver, 500);
          await driver.pressKeyCode(KEYCODE_APP_SWITCH);
          await WaitUtil.pause(driver, 500);
        }
      } catch (error) {
        LOGGER.info(error.stack);
        throw new Error(error);
      }
    }

  /**
   * navigates to default url
   * @param js
   */
  export async function navigateToHomepage(driver: Browser<'async'>) {
    try {
      await driver.navigateTo(url);
    } catch (error) {
      LOGGER.info(error.stack);
      throw new Error(error);
    }
  }

  /**
   * save cookies from the browser driver
   * @param js
   */
  export async function saveCookies(driver: Browser<'async'>, cookieNames: string[]): Promise<any> {
    const savedCookies: [{}] = [{}];
    savedCookies.pop();
    try {
      const cookies = await driver.getAllCookies();
      for (let index = 0; index < cookies.length; index += 1) {
        if (cookieNames.includes(cookies[index].name)) {
          const tempObj: any = {};
          tempObj.name = cookies[index].name;
          tempObj.value = cookies[index].value;
          tempObj.domain = cookies[index].domain;
          tempObj.path = cookies[index].path;
          tempObj.secure = cookies[index].secure;
          tempObj.expiry = cookies[index].expiry;
          savedCookies.push(tempObj);
          LOGGER.info(`saved cookie details for cookie name-${cookies[index].name}`);
        }
      }
    } catch (error) {
      LOGGER.info(error.stack);
      throw new Error(error);
    }
    return savedCookies;
  }

  /**
   * save all cookies from the browser driver
   */
   export async function saveAllCookies(driver: Browser<'async'>, phoneNumber:string): Promise<void> {
     const userTokenFilePath: string = `${join(Constants.tokensFolderPath, `${phoneNumber}_${Constants.env}_cookies`)}.json`;
     try {
       const cookies = await driver.getAllCookies();
       writeFileSync(userTokenFilePath, JSON.stringify(cookies));
     } catch (error) {
       LOGGER.error(`Save cookies failed ${error.stack}`);
       throw new Error(error);
     }
   }

  /**
   * set all cookies to the browser driver
   */
   export async function setAllCookies(driver: Browser<'async'>, phoneNumber:string): Promise<void> {
     const userTokenFilePath: string = `${join(Constants.tokensFolderPath, `${phoneNumber}_${Constants.env}_cookies`)}.json`;
     try {
       const savedCookies = JsonReaderHelper.readAttribute('$', userTokenFilePath);
       await driver.setCookies(savedCookies);
     } catch (error) {
       LOGGER.error(`Save cookies failed ${error.stack}`);
       throw new Error(error);
     }
   }

  /**
   * save all storage from the browser driver
   */
   export async function saveAllLocalStorage(driver: Browser<'async'>, phoneNumber:string): Promise<void> {
     const localStorageDetails:[{}] = [{}];
     localStorageDetails.pop(); // remove default object
     const userTokenFilePath: string = `${join(Constants.tokensFolderPath, `${phoneNumber}_localStorage`)}.json`;
     try {
       const localStorageKeys = await driver.execute(function () { return Object.keys(this.localStorage); });
       // LOGGER.info(JSON.stringify(localStorageKeys));
       for (let index = 0; index < localStorageKeys.length; index += 1) {
         const localStorageValue = await driver.execute(`return this.localStorage.getItem('${localStorageKeys[index]}')`);
         localStorageDetails.push({ key: localStorageKeys[index], value: localStorageValue });
       }
       writeFileSync(userTokenFilePath, JSON.stringify(localStorageDetails));
     } catch (error) {
       LOGGER.error(`Save local storage failed ${error.stack}`);
       throw new Error(error);
     }
   }

  /**
   * set all local storage details to the browser driver
   */
   export async function setAllLocalStorageValues(driver: Browser<'async'>, phoneNumber:string): Promise<void> {
     const userTokenFilePath: string = `${join(Constants.tokensFolderPath, `${phoneNumber}_localStorage`)}.json`;
     try {
       const localStorageDetails = JsonReaderHelper.readAttribute('$', userTokenFilePath);

       for (let index = 0; index < localStorageDetails.length; index += 1) {
         await driver.execute(`this.localStorage.setItem('${localStorageDetails[index].key}','${localStorageDetails[index].value}')`);
       }
     } catch (error) {
       LOGGER.error(`Set local storage failed ${error.stack}`);
       throw new Error(error);
     }
   }

  export async function getDriver(configJson: {}): Promise<Browser<'async'>> {
    const browserObj = await remote(configJson as RemoteOptions);
    return browserObj;
  }
}
