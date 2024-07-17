import { Element } from 'webdriverio';
import { BasePage } from '../../../uiExport';

/**
 * Ekam Docs page
 */
export class DocsPage extends BasePage {
  private selectors = {
    ekamLogo: "//img[@alt='ekam logo']",
    gettingStartedTitle: "//h1[text()='Getting started']",
    githubIcon: "//span[text()='GitHub']",
    toggleDarkIcon: "//span[@class='toggle-dark']",
    docsSearchBar: "//input[@id='userinput']",
  };

  async getEkamLogoEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.ekamLogo);
  }

  async getGettingStartedTitleEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.gettingStartedTitle);
  }

  async getGithubIconEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.githubIcon);
  }

  async getToggleDarkIconEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.toggleDarkIcon);
  }

  async getDocsSearchBarEle(): Promise<Element<'async'>> {
    return this.getElement(this.selectors.docsSearchBar);
  }

  async enterTextToBeSearchedInDocs(text: string): Promise<void> {
    await this.setValue(await this.getDocsSearchBarEle(), text);
  }

  async getGettingStartedTitleEleText(): Promise<string> {
    return this.getText(await this.getGettingStartedTitleEle());
  }
}
