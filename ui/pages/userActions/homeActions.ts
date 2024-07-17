import { Browser } from 'webdriverio';
import { BasePage, DocsPage, HomePage } from '../../../uiExport';

export class HomeActions extends BasePage {
  homePage: HomePage;

  docsPage: DocsPage;

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.homePage = new HomePage(driver);
    this.docsPage = new DocsPage(driver);
  }

  async clickingOnDocsLink(hyperLinkText: string) {
    await this.waitForDisplayed(await this.homePage.getSuperchargedTitleEle());
    return this.homePage.navigateUsingHyperLink(hyperLinkText);
  }
}
