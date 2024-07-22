import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class LoginScreen extends BaseScreen {
  private selectors = {
    loginScrenHeader: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-login-heading']", ios: "" },
    emailTextField: { android: "//*[@text='Enter your email']", ios: "" },
    passwordTextField: { android: "//*[@text='Enter your password']", ios: "" },
    loginButton: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-login']",
      ios: "",
    },
    forgotPassword: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-forgot-password']", ios: "" }
  };

  async header(): Promise<Element<'async'>> {
    this.waitForDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.loginScrenHeader)));
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.loginScrenHeader));
  }

  async emailTextFieldEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.emailTextField)
    );
  }

  async passwordTextFieldEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.passwordTextField)
    );
  }

  async loginButtonEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.loginButton)
    );
  }

  async forgotPasswordEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.forgotPassword)
    );
  }

}
