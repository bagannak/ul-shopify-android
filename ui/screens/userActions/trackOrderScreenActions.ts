import { Browser, Element } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";

export class TrackOrderScreenActions extends BaseScreen {

    constructor(driver: Browser<"async">) {
    super(driver);
  }
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }
  async navigateBack(element: Element<"async">) {
    await this.click(element);
  }
}
