/* eslint no-dupe-class-members: "off" */
/* eslint no-unused-vars: "off" */
/* eslint class-methods-use-this: "off" */
/* eslint no-return-assign: "off" */
/* eslint no-param-reassign: "off" */

import { readFileSync } from 'fs';
import { Browser, Element } from 'webdriverio';
import { CONTEXT_REF, WebViewScreen, XpathUtil } from '../../../uiExport';
import { DateTimeUtil, LOGGER, WaitUtil } from '../../../webservicesExport';

export class BasePage {
  driver: Browser<'async'>;

  constructor(driver: Browser<'async'>) {
    this.driver = driver;
  }

  /**
   * return the element
   * @param locator
   * @returns
   */
  async getElement(locator: string): Promise<Element<'async'>> {
    const element = await this.driver.$(locator);
    return element;
  }

  /**
   * return the elements
   * @param locator
   * @returns
   */
  async getElements(locator: string): Promise<Element<'async'>[]> {
    const element = await this.driver.$$(locator);
    return element;
  }

  /**
   * click on the element
   * @param element pass webelement or locator string
   */
  async click(element: string, timeout?: number): Promise<void>;

  async click(element: Element<'async'>, timeout?: number): Promise<void>;

  async click(element: any, timeout?: number): Promise<void> {
    const timeOut = timeout ?? 30000;
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed({ timeout: timeOut });
      await (await this.getElement(element)).waitForClickable({ timeout: timeOut });
      await (await this.getElement(element)).click();
    } else {
      await element.waitForDisplayed({ timeout: timeOut });
      await element.waitForClickable({ timeout: timeOut });
      await element.click();
    }
  }

  /**
   * click on the button
   * @param buttonName pass button name
   */
  async clickButton(buttonName: string): Promise<void> {
    const genericButtonXpath:string = "(//ons-button[normalize-space(text())='##PLACEHOLDER##'])|(//button[normalize-space(text())='##PLACEHOLDER##'])";
    const finalXpath:string = XpathUtil.getPlaceholderReplaced(genericButtonXpath, buttonName);
    await this.click(finalXpath);
  }

  /**
   * select dropdown by visible text
   * @param element pass webelement or locator string
   * @param value
   */
  async selectByVisibleText(element: string, value: string): Promise<void>;

  async selectByVisibleText(element: Element<'async'>, value: string): Promise<void>;

  async selectByVisibleText(element: any, value: string): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
      await (await this.getElement(element)).waitForClickable();
      await (await this.getElement(element)).selectByVisibleText(value);
    } else {
      await element.waitForDisplayed();
      await element.waitForClickable();
      await element.selectByVisibleText(value);
    }
  }

  /**
   * check element is clickable
   * @param element pass webelement or locator string
   */
  async isClickable(element: string): Promise<boolean>;

  async isClickable(element: Element<'async'>): Promise<boolean>;

  async isClickable(element: any): Promise<boolean> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForExist();
      await (await this.getElement(element)).waitForClickable();
      const isClickable = await (await this.getElement(element)).isClickable();
      return isClickable;
    }
    await element.waitForExist();
    await element.waitForClickable();
    const isClickable = element.isClickable();
    return isClickable;
  }

  /**
   * set value to text box
   * @param element pass webelement or locator string
   * @param value
   */
  async setValue(element: string, value: string, timeout?: number): Promise<void>;

  async setValue(element: Element<'async'>, value: string, timeout?: number): Promise<void>;

  async setValue(element: any, value: string, timeout?: number): Promise<void> {
    const timeOut = timeout ?? 30000;
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed({ timeout: timeOut });
      await (await this.getElement(element)).waitForClickable({ timeout: timeOut });
      await (await this.getElement(element)).setValue(value);
    } else {
      await element.waitForDisplayed({ timeout: timeOut });
      await element.waitForClickable({ timeout: timeOut });
      await element.setValue(value);
    }
  }

  /**
   * set value to text box
   * @param placeholder pass placeholder string for the input
   * @param value
   */
  async setTextboxValue(placeholder: string, value: string): Promise<void> {
    const genericButtonXpath:string = "(//input[normalize-space(@placeholder)='##PLACEHOLDER##'])|(//ons-input[normalize-space(@placeholder)='##PLACEHOLDER##']/input)";
    const finalXpath:string = XpathUtil.getPlaceholderReplaced(genericButtonXpath, placeholder);
    await this.setValue(finalXpath, value);
  }

  /**
   * clear value of text box
   * @param element pass webelement or locator string
   */
  async clearValue(element: string): Promise<void>;

  async clearValue(element: Element<'async'>): Promise<void>;

  async clearValue(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForClickable();
      await (await this.getElement(element)).waitForClickable();
      await (await this.getElement(element)).clearValue();
    } else {
      await element.waitForClickable();
      await element.clearValue();
    }
  }

  /**
   * get text of element
   * @param element pass webelement or locator string
   */
  async getText(element: string, timeout?: number): Promise<string>;

  async getText(element: Element<'async'>, timeout?: number): Promise<string>;

  async getText(element: any, timeout?: number): Promise<string> {
    const timeOut = timeout ?? 30000;
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed({ timeout: timeOut });
      const value = (await (await this.getElement(element)).getText()).trim();
      return value;
    }
    await element.waitForDisplayed({ timeout: timeOut });
    const value = (await element.getText()).trim();
    return value;
  }

  /**
   * right click on the element
   * @param element pass webelement or locator string
   */
  async rightClick(element: string): Promise<void>;

  async rightClick(element: Element<'async'>): Promise<void>;

  async rightClick(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForClickable();
      await (await this.getElement(element)).click({ button: 'right' });
    } else {
      await element.waitForClickable();
      await element.click({ button: 'right' });
    }
  }

  /**
   * wait for element to be displayed
   * @param element pass webelement or locator string
   * @param value
   */
  async waitForDisplayed(element: string): Promise<void>;

  async waitForDisplayed(element: Element<'async'>): Promise<void>;

  async waitForDisplayed(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
    } else {
      await element.waitForDisplayed();
    }
  }

  /**
   * wait for element to be clickable
   * @param element pass webelement or locator string
   */
  async waitForClickable(element: string): Promise<void>;

  async waitForClickable(element: Element<'async'>): Promise<void>;

  async waitForClickable(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForClickable();
    } else {
      await element.waitForClickable();
    }
  }

  /**
   * wait for element to exist
   * @param element pass webelement or locator string
   */
  async waitForExist(element: string): Promise<void>;

  async waitForExist(element: Element<'async'>): Promise<void>;

  async waitForExist(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForExist();
    } else {
      await element.waitForExist();
    }
  }

  /**
   * check if element is displayed
   * @param element pass webelement or locator string
   */
  async isDisplayed(element: string, timeout?: number): Promise<boolean>;

  async isDisplayed(element: Element<'async'>, timeout?: number): Promise<boolean>;

  async isDisplayed(element: any): Promise<boolean> {
    // const timeOut = timeout ?? 20000;
    if (typeof element === 'string') {
      // await (await this.getElement(element)).waitForDisplayed({ timeout: timeOut });
      const isPresent = await (await this.getElement(element)).isDisplayed();
      return isPresent;
    }
    // await element.waitForDisplayed({ timeout: timeOut });
    const isPresent = await element.isDisplayed();
    return isPresent;
  }

  /**
   * check if element exist
   * @param element pass webelement or locator string
   */
  async isExisting(element: string): Promise<boolean>;

  async isExisting(element: Element<'async'>): Promise<boolean>;

  async isExisting(element: any): Promise<boolean> {
    if (typeof element === 'string') {
      const isExist = await (await this.getElement(element)).isExisting();
      return isExist;
    }

    const isExist = await element.isExisting();
    return isExist;
  }

  /**
   * click on x,y coordinates
   * @param element pass webelement or locator string
   * @param x co-ordinate
   * @param y co-ordinate
   */
  async clickAtCoordinates(element: string, x: number, y: number): Promise<void>;

  async clickAtCoordinates(element: Element<'async'>, x: number, y: number): Promise<void>;

  async clickAtCoordinates(element: any, x: number, y: number): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForClickable();
      await (await this.getElement(element)).click({ x, y });
    } else {
      await element.waitForClickable();
      await element.click({ x, y });
    }
  }

  /**
   * check element is not displayed
   * @param element pass webelement or locator string
   */
  async isNotDisplayed(element: string): Promise<boolean>;

  async isNotDisplayed(element: Element<'async'>): Promise<boolean>;

  async isNotDisplayed(element: any): Promise<boolean> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed({ reverse: true, timeout: 10000 });
      const isNotPresent = !(await (await this.getElement(element)).isDisplayed());
      return isNotPresent;
    }
    await element.waitForDisplayed({ reverse: true, timeout: 10000 });
    const isNotPresent = !(await element.isDisplayed());
    return isNotPresent;
  }

  /**
   * check button is enabled
   * @param element pass webelement or locator string
   */
  async isEnabled(element: string): Promise<boolean>;

  async isEnabled(element: Element<'async'>): Promise<boolean>;

  async isEnabled(element: any): Promise<boolean> {
    await element.waitForExist();
    await element.waitForDisplayed();
    const isEnable = element.isEnabled();
    return isEnable;
  }

  /**
  * scroll to webelement
  * @param element
  */
  async scrollElement(element: string): Promise<void>;

  async scrollElement(element: Element<'async'>): Promise<void>;

  async scrollElement(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForExist();
      await (await this.getElement(element)).scrollIntoView();
    }
    await element.waitForExist();
    element.isClickable();
  }

  /**
   * this method waits for element to be visible and controlls whether to fail or ignore
   * @param element
   * @param timeout
   * @param ignoreIfNotDisplayed
   */
  async waitForElementDisplayed(
    element: string,
    timeout: number,
    ignoreIfNotDisplayed?: boolean
  ): Promise<boolean>;

  async waitForElementDisplayed(
    element: Element<'async'>,
    timeout: number,
    ignoreIfNotDisplayed?: boolean
  ): Promise<boolean>;

  async waitForElementDisplayed(
    element: any,
    timeout: number,
    ignoreIfNotDisplayed?: boolean,
  ): Promise<boolean> {
    try {
      LOGGER.info(`waiting for element to be displayed max ${timeout} milliseconds`);
      if (typeof element === 'string') {
        await (await this.getElement(element)).waitForDisplayed({ timeout });
      } else {
        await element.waitForDisplayed({ timeout });
      }
      return true;
    } catch (error) {
      if (!ignoreIfNotDisplayed) throw new Error(`element ${element} not displayed even after waiting ${timeout}`);
      else return false;
    }
  }

  /**
   * upload a Document this method works both on mobile app and chrome
   * imageFilePath pass the image file path
   * elementLocator pass proper locator to input element
   */
  async uploadDocument(fullFilePath: string, element:string):Promise<void>;

  async uploadDocument(fullFilePath: string, element:Element<'async'>):Promise<void>;

  async uploadDocument(fullFilePath: string, element:any):Promise<any> {
    try {
      let remoteFilePath = fullFilePath;
      await this.driver.execute(
        // assign style to elem in the browser
        (elem: { style: { display: string; }; }) => elem.style.display = 'block',
        // pass in element so we don't need to query it again in the browser
        await this.driver.$(element),
      );
      await this.waitForDisplayed(await this.getElement(element));
      await WaitUtil.pause(this.driver, 2000);
      remoteFilePath = fullFilePath;
      if (this.driver.isMobile) {
        // this helps in uploading file while running from lambdatest app
        const data = readFileSync(fullFilePath, 'base64');
        const filePathSplit = fullFilePath.split('/');
        const onDeviceFilePath = `/data/local/tmp/file/${filePathSplit[filePathSplit.length - 1]}`;
        await this.driver.pushFile(onDeviceFilePath, data);
        remoteFilePath = onDeviceFilePath;
      } else {
        // this helps in uploading file while running from browserstack, lambdatest web
        remoteFilePath = await this.driver.uploadFile(fullFilePath);
      }
      if (typeof element === 'string') await (await this.getElement(element)).setValue(remoteFilePath);
      else await element.setValue(remoteFilePath);
      await WaitUtil.pause(this.driver, 2000);
    } catch (err) {
      LOGGER.error(`Error while Uploading Document ${err.message}\n${err.stack}`);
      throw err;
    }
  }

  /**
   * helps in setting date picker value
   * @param inputDateLocator pass the xpath pointing to date ex. //input[@type='date']
   * @param date
   */
  async setDateValue(element:string, date:Date):Promise<void>;

  async setDateValue(element:Element<'async'>, date:Date):Promise<void>;

  async setDateValue(element:any, date:Date) {
    let daysFromCurrentDate:number = Math.floor(await DateTimeUtil.getDifferenceInDays(new Date(), date));
    const currentDate = await DateTimeUtil.convertDate(new Date(), 'dd mmmm yyyy');
    const dateToSelect = await DateTimeUtil.convertDate(date, 'dd mmmm yyyy');
    const nextMonth = '//*[@content-desc="Next month"]';
    const dateToSelectXpath = `//*[@content-desc="${dateToSelect}"]`;
    const availableDates = `//*[@content-desc="${currentDate}"]/following-sibling::*`;
    const setButton = "//*[@text='SET']";

    // if non zero then select date, else no need to select
    const dateDiff = await DateTimeUtil.getDifferenceInHours(new Date(), date);
    if (daysFromCurrentDate > 0 || dateDiff > 23) {
      let inputDateElement = element;
      if (typeof element === 'string') inputDateElement = await this.getElement(element);

      const location = await inputDateElement.getLocation();
      const size = await inputDateElement.getSize();
      LOGGER.info(`location-${JSON.stringify(location)}, size-${JSON.stringify(size)}`);
      const clickPoint:{x:number, y:number} = { x: Math.floor((size.width / 2) - 5), y: Math.floor(location.y) };
      LOGGER.info(`clicking at - ${JSON.stringify(clickPoint)}`);
      await this.waitForDisplayed(inputDateElement);
      await inputDateElement.click({ x: clickPoint.x });
      await WaitUtil.pause(this.driver, 1000);
      if (this.driver.isMobile) {
        const webViewScreen = new WebViewScreen(this.driver);
        await webViewScreen.switchToContext(CONTEXT_REF.NATIVE);
        const availableFollowingDates = (await this.getElements(availableDates)).length;
        if (daysFromCurrentDate > availableFollowingDates) await (await this.getElement(nextMonth)).click();
        await (await this.getElement(dateToSelectXpath)).click();
        await WaitUtil.pause(this.driver, 1000);
        await (await this.getElement(setButton)).click();
        await webViewScreen.switchToContext(CONTEXT_REF.WEBVIEW);
      } else {
        if (dateDiff > 23 && dateDiff < 24) daysFromCurrentDate = 1;
        for (let index = 0; index < daysFromCurrentDate; index += 1) {
          await this.driver.keys('Right arrow');
        }
        await WaitUtil.pause(this.driver, 1000);
        await this.driver.keys('Enter');
      }
    }
  }

  /**
   * use to hide mobile keyboard
   */
  async hideKeyboard() {
    if (this.driver.isMobile) {
      await this.driver.hideKeyboard();
    }
  }
}
