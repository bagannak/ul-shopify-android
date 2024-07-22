import { Browser } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { HomeScreen } from "../common/homeScreen";
import { Element } from "webdriverio";
import { ProfileScreen } from "../common/profileScreen";
export class ProfileActions extends BaseScreen {
  profileScreen: ProfileScreen

  constructor(driver: Browser<"async">) {
    super(driver);
    this.profileScreen = new ProfileScreen(driver);
  }
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }

  async tapOnRegisterButton() {
    await this.click(await this.profileScreen.registerButton());
  }

  async tapOnLoginButton() {
    await this.click(await this.profileScreen.loginButton());
  }

  async isUserOnProfileScreen() {
    return await this.isDisplayed(await this.profileScreen.loginButton());
  }

  async isLoginButtonPresent() {
    return await this.isDisplayed(await this.profileScreen.loginButton());
  }

  async isRegisterButtonPresent() {
    return await this.isDisplayed(await this.profileScreen.registerButton());

  }

}
