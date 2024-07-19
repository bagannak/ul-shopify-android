import { Browser } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { HomeScreen } from "../common/homeScreen";
import { Element } from "webdriverio";
export class HomeScreenActions extends BaseScreen {
  homeScreen: HomeScreen;
  constructor(driver: Browser<"async">) {
    super(driver);
    this.homeScreen = new HomeScreen(driver);
  }
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }
}
