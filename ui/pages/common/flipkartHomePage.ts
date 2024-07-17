import { Element } from 'webdriverio';
import {
  BasePage, XpathUtil,
} from '../../../uiExport';

/**
 * Google Home page of application
 */
export class FlipkartHomePage extends BasePage {
  private selectors = {
    loginButton: "(//div[@id='container']/div/div)[1]//a[text()='Login']",
    flipkartImg: "(//div[@id='container']/div/div)[1]//img[@title='Flipkart']",
    menuImg: "//img[@alt='##PLACEHOLDER##']",
    searchInput: "//input[@placeholder='Search for products, brands and more']",

  };

  async getLoginButtonEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.loginButton);
  }

  async getFlipkartImgEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.flipkartImg);
  }

  async getMenuImgEle(menuName:string): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getPlaceholderReplaced(this.selectors.menuImg, menuName));
  }

  async getSearchInputEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.searchInput);
  }

  async navigateToMenu(menuName:string): Promise<void> {
    await this.click(await this.getMenuImgEle(menuName));
  }

  async searchProduct(productName:string): Promise<void> {
    await this.setValue(await this.getSearchInputEle(), productName);
    await this.driver.keys('Enter');
  }
}
