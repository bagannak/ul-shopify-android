import { Browser,Element } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { HomeScreen } from "../common/homeScreen";

export class HomeScreenActions extends BaseScreen {
  homeScreen: HomeScreen;
  constructor(driver: Browser<"async">) {
    super(driver);
    this.homeScreen = new HomeScreen(driver);
  }
  async navigateTo(element: Element<"async">) {
    await this.click(element);
  }
  async scrollForward() {
    const selector = 'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()';
       await this.driver.$(selector);
  }

  async scrollProductCategory() {
    // const element = await this.homeScreen.productCategoryScrollEle();
    await this.driver.execute('mobile: scroll', {
      strategy:'xpath',
      selector: "(//*[@class='android.widget.HorizontalScrollView'])[1]",
      direction: 'right'
    });
  }

  
}
