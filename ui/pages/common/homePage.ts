import { Element } from 'webdriverio';
import { BasePage, XpathUtil } from '../../../uiExport';

/**
 * Home page of Ekam
 */
export class HomePage extends BasePage {
  private selectors = {
    ekamLogo: "//img[@alt='ekam']",
    navBarHyperLink: "//a[text()='##PLACEHOLDER##']",
    getStartedButton: '//span[text()="Get Started"]',
    superchargedTitle: "//span[text()='Supercharged']",
  };

  async getEkamIconEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.ekamLogo);
  }

  async getNavBarHyperLinkEle(hyperLinkText: string): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getPlaceholderReplaced(this.selectors.navBarHyperLink, hyperLinkText));
  }

  async navigateUsingHyperLink(hyperLinkText: string): Promise<void> {
    await this.click(await this.getNavBarHyperLinkEle(hyperLinkText));
  }

  async getSuperchargedTitleEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.superchargedTitle);
  }

  async getSuperchargedTitleEleText(): Promise<string> {
    return this.getText(await this.getSuperchargedTitleEle());
  }

  async getGetStartedButtonEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.getStartedButton);
  }
}
