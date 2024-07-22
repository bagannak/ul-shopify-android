import { Browser } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { HomeScreen } from "../common/homeScreen";
import { Element } from "webdriverio";
import { ProfileScreen } from "../common/profileScreen";
export class ProfileActions extends BaseScreen {
  profileScreen:ProfileScreen
    constructor(driver: Browser<"async">) {
    super(driver);
    this.profileScreen = new ProfileScreen(driver);
  }
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }
  async navigateBack(element: Element<"async">) {
    await this.click(element);
  }
}
