import { Browser } from 'webdriverio';
import { BaseScreen, LoginScreen } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';
import { ProfileScreen } from '../common/profileScreen';

export class LoginActions extends BaseScreen {
  profileScreen: ProfileScreen;
  loginScreen: LoginScreen;
  homeScreen: HomeScreen;

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.profileScreen = new ProfileScreen(driver);
    this.loginScreen = new LoginScreen(driver);
    this.homeScreen = new HomeScreen(driver);

  }

  async login(accountDetails: { email: string, password: string }) {
    await this.profileScreen.tapOnLoginButton();
    await this.loginScreen.fillLoginDetails(accountDetails);
  }
}
