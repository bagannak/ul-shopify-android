import { Browser } from 'webdriverio';
import { BaseScreen, LoginScreen, OtpActions } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';
import { ProfileScreen } from '../common/profileScreen';

export class LoginActions extends BaseScreen {
  profileScreen: ProfileScreen;
  loginScreen: LoginScreen;
  homeScreen: HomeScreen;
  otpActions: OtpActions

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.profileScreen = new ProfileScreen(driver);
    this.loginScreen = new LoginScreen(driver);
    this.homeScreen = new HomeScreen(driver);
    this.otpActions = new OtpActions(driver);
  }

  async login(accountDetails: { email: string, password: string }) {
    await this.profileScreen.tapOnLoginButton();
    await this.loginScreen.fillLoginDetails(accountDetails);
    await this.otpActions.enterOtpAndSubmit('0000');
  }
}
