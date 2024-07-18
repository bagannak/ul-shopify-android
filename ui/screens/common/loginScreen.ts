import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class LoginScreen extends BaseScreen {
  private selectors = {
    emailTextField: { android: "//*[@text='Enter your email']", ios: "" },
    passwordTextField: { android: "//*[@text='Enter your password']", ios: "" },
    loginButton: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-login']",
      ios: "",
    },
  };

  async emailTextField(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.emailTextField)
    );
  }

  async passwordTextField(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.passwordTextField)
    );
  }

  async loginButton(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.loginButton)
    );
  }

  async fillLoginDetails(accountDetails: { email: string; password: string }) {
    await this.setValue(await this.emailTextField(), accountDetails.email);
    await this.setValue(
      await this.passwordTextField(),
      accountDetails.password
    );
    await this.click(await this.loginButton());
  }
}
