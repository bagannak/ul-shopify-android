import { Browser } from 'webdriverio';
import { BaseScreen, LoginScreen } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';

export class LoginActions extends BaseScreen {
  loginScreen:LoginScreen;

  homeScreen:HomeScreen;

  constructor(driver:Browser<'async'>) {
    super(driver);
    this.loginScreen = new LoginScreen(driver);
    this.homeScreen = new HomeScreen(driver);
  }

  async login(accountDetails:{username:string, password:string}) {
    await this.loginScreen.fillLoginDetails(accountDetails);
    await this.waitForDisplayed(await this.homeScreen.productLabelEle());
  }
}
