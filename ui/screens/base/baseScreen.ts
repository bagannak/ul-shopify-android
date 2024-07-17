/* eslint no-dupe-class-members: "off" */
/* eslint no-unused-vars: "off" */
/* eslint class-methods-use-this: "off" */
import { Browser, Element } from 'webdriverio';

export class BaseScreen {
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
  async click(element: string): Promise<void>;

  async click(element: Element<'async'>): Promise<void>;

  async click(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
      await (await this.getElement(element)).click();
    } else {
      await element.waitForDisplayed();
      await element.click();
    }
  }

  /**
   * set value to text box
   * @param element pass webelement or locator string
   * @param value
   */
  async setValue(element: string, value: string): Promise<void>;

  async setValue(element: Element<'async'>, value: string): Promise<void>;

  async setValue(element: any, value: string): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
      await (await this.getElement(element)).setValue(value);
    } else {
      await element.waitForDisplayed();
      await element.setValue(value);
    }
  }

  /**
   * clear value of text box
   * @param element pass webelement or locator string
   */
  async clearValue(element: string): Promise<void>;

  async clearValue(element: Element<'async'>): Promise<void>;

  async clearValue(element: any): Promise<void> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).clearValue();
    } else {
      await element.clearValue();
    }
  }

  /**
   * get text of element
   * @param element pass webelement or locator string
   */
  async getText(element: string): Promise<string>;

  async getText(element: Element<'async'>): Promise<string>;

  async getText(element: any): Promise<string> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
      const value = (await (await this.getElement(element)).getText()).trim();
      return value;
    }
    await element.waitForDisplayed();
    const value = (await element.getText()).trim();
    return value;
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
  async isDisplayed(element: string): Promise<boolean>;

  async isDisplayed(element: Element<'async'>): Promise<boolean>;

  async isDisplayed(element: any): Promise<boolean> {
    if (typeof element === 'string') {
      await (await this.getElement(element)).waitForDisplayed();
      const isElementDisplayed = await (await this.getElement(element)).isDisplayed();
      return isElementDisplayed;
    }
    await element.waitForDisplayed();
    const isElementDisplayed = await element.isDisplayed();
    return isElementDisplayed;
  }

  /**
   * check if element exist
   * @param element pass webelement or locator string
   */
  async isExisting(element: string): Promise<boolean>;

  async isExisting(element: Element<'async'>): Promise<boolean>;

  async isExisting(element: any): Promise<boolean> {
    if (typeof element === 'string') {
      const isElementExist = await (await this.getElement(element)).isExisting();
      return isElementExist;
    }

    const isElementExist = await element.isExisting();
    return isElementExist;
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
      await (await this.getElement(element)).click({ x, y });
    } else {
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
      return !(await (await this.getElement(element)).isDisplayed());
    }
    await element.waitForDisplayed({ reverse: true, timeout: 10000 });
    return !element.isDisplayed();
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
    const isEnabled = await element.isEnabled();
    return isEnabled;
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
}
