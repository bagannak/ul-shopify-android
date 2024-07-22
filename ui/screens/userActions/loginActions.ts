import { Browser } from 'webdriverio';
import { BaseScreen, LoginScreen, OtpActions } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';
import { ProfileScreen } from '../common/profileScreen';
import { ProfileActions } from './profileActions';

export class LoginActions extends BaseScreen {
  profileActions: ProfileActions;
  loginScreen: LoginScreen;
  homeScreen: HomeScreen;
  otpActions: OtpActions

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.profileActions = new ProfileActions(driver);
    this.loginScreen = new LoginScreen(driver);
    this.homeScreen = new HomeScreen(driver);
    this.otpActions = new OtpActions(driver);
  }

  async login(accountDetails: { email: string, password: string }) {
    await this.profileActions.tapOnLoginButton();
    await this.fillLoginDetails(accountDetails);
    await this.otpActions.enterOtpAndSubmit('0000');
  }

  async isUserOnLoginScreen() {
    return await this.isDisplayed(await this.loginScreen.header());
  }

  async fillLoginDetails(accountDetails: { email: string; password: string }) {
    await this.setValue(await this.loginScreen.emailTextField(), accountDetails.email);
    await this.setValue(
      await this.loginScreen.passwordTextField(),
      accountDetails.password
    );
    await this.click(await this.loginScreen.loginButton());
  }
}
