import { Browser, Element } from 'webdriverio';
import { BaseScreen } from '../base/baseScreen';
import { HomeScreen } from '../common/homeScreen';

export class HomeScreenActions extends BaseScreen {
  homeScreen: HomeScreen;

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.homeScreen = new HomeScreen(driver);
  }

  async navigateTo(element: Element<'async'>) {
    await this.click(element);
  }
}
