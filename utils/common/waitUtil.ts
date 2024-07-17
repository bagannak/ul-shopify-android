/* eslint no-promise-executor-return: 0 */
import { Browser } from 'webdriverio';
import { LOGGER } from '../reporting/loggerHelper';

export module WaitUtil {
  const loadingTextXpath: string = "//*[contains(text(),'Loading...')]";

  /**
   * wait during api automation
   * @param ms
   * @returns
   */
  export async function sleep(ms: number): Promise<void> {
    LOGGER.info(`waiting for ${ms} milliseconds`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * this method will helps in waiting between different operations
   * @param milliseconds
   */
  export async function pause(driver: Browser<'async'>, milliseconds: number) {
    LOGGER.info(`waiting for ${milliseconds} milliseconds`);
    await driver.pause(milliseconds);
  }

  /**
   * this will wait until loading text disappear
   */
   export async function waitForLoadingDisappear(driver: Browser<'async'>, timeOut?: number) {
     try {
       let tempTimeOut:number = timeOut;
       let loaderDisappered:boolean = false;
       if (timeOut === undefined) tempTimeOut = (await driver.getTimeouts()).implicit;
       LOGGER.info(`waiting until loading text disappear for maximum ${tempTimeOut} milliseconds`);
       if (driver.isMobile) await WaitUtil.pause(driver, 2000);
       else await WaitUtil.pause(driver, 500);
       // const loadingTextEle = await (await driver.$(loadingTextXpath))
       if (await (await driver.$(loadingTextXpath)).isDisplayed()) {
         for (let index = 0; index < tempTimeOut / 1000; index += 1) {
           if (!(await driver.$(loadingTextXpath).isClickable())) {
             loaderDisappered = true;
             break;
           } else {
             await driver.pause(1000);
           }
         }
         if (!loaderDisappered) throw new Error(`page still loading even after waiting ${timeOut}`);
       }
     } catch (error) {
       LOGGER.error(error.stack);
       throw new Error(error);
     }
   }
}
