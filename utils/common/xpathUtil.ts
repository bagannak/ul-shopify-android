import { Browser } from 'webdriverio';
import { LOGGER } from '../../webservicesExport';
/**
 * Xpath helper will have common reusable methods related to xpath and getting locator
 */

export module XpathUtil {
  /**
  * this method will get xpath based on os version
  */
  export function getXpath(driver:Browser<'async'>, xpathObject:{android:string, ios:string}): string {
    let xpath: string = '';
    try {
      if (driver.isIOS) xpath = xpathObject.ios;
      else xpath = xpathObject.android;
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
    return xpath;
  }

  /**
  * this method will replace ##PLACEHOLDER## with value passed
  */
  export function getPlaceholderReplaced(xpath: string, replacement: string): string {
    let resultStr: string = '';
    try {
      resultStr = xpath.replace(/##PLACEHOLDER##/g, replacement);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
    return resultStr;
  }
}
