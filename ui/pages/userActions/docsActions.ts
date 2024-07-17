import { Browser } from 'webdriverio';
import {
  BasePage, DocsPage, EkamNavBarHyperLinks, HomePage,
} from '../../../uiExport';

export class DocsActions extends BasePage {
  homePage: HomePage;

  docsPage: DocsPage;

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.homePage = new HomePage(driver);
    this.docsPage = new DocsPage(driver);
  }

  async isGettingStartedTextVisible(expectedText:string) {
    await this.waitForDisplayed(await this.homePage.getSuperchargedTitleEle());
    await this.homePage.navigateUsingHyperLink(EkamNavBarHyperLinks.Docs);
    await this.waitForDisplayed(await this.docsPage.getEkamLogoEle());
    const actualText = await this.docsPage.getGettingStartedTitleEleText();
    return actualText === expectedText;
  }
}
