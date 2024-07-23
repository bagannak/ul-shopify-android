import { Browser, Element } from 'webdriverio';
import { BaseScreen, LoginScreen, OtpActions } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';
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
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }

  async isElementDisplayed(element: Element<"async">): Promise<boolean> {
    return this.isDisplayed(await element);
  }

  async fillLoginDetails(accountDetails: { email: string; password: string }) {
    await this.setValue(await this.loginScreen.emailTextFieldEle(), accountDetails.email);
    await this.setValue(
      await this.loginScreen.passwordTextFieldEle(),
      accountDetails.password
    );
    await this.click(await this.loginScreen.loginButtonEle());
  }
}
