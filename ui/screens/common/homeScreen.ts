import { Element } from "webdriverio";
import { BaseScreen, XpathUtil } from "../../../uiExport";
import { profile } from "console";

export class HomeScreen extends BaseScreen {
  private selectors = {
    productLabel: {android: "//*[@text='PRODUCTS']",ios: "//*[@name='inp-fullname']"},
    welcomeMsg:{android:"//*[@text='Welcome Back!!']",ios:""},
    searchBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-search']",ios:""},
    profileIconText: { android: "//*[@text='Profile']", ios: "" },
    profileIcon: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-profile']",ios: ""},
    homeIcon: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-home']", ios: "" },
    homeIconText: { android: "//*[@text='Home']", ios: "" },
    cartIcon: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-cart']", ios: "" },
    cartIconText: { android: "//*[@text='Cart']", ios: "" },
    exploreIcon: {android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-explore']",ios: ""},
    exploreIconText: { android: "//*[@text='Explore']", ios: "" },
    trackIcon: {android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-track-order']",ios: ""},
    trackIconText: { android: "//*[@text='Track']", ios: "" },
  };

  async productLabelEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.productLabel)
    );
  }
  async profileIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.profileIconText)
    );
  }
  async profileIcon(): Promise<Element<"async">> {
    return this.getElement(this.selectors.profileIcon.android);
  }

  async trackIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.trackIconText)
    );
  }
  async trackIconEle(): Promise<Element<"async">> {
    return this.getElement(this.selectors.trackIcon.android);
  }
  async exploreIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.exploreIconText)
    );
  }
  async exploreIconEle(): Promise<Element<"async">> {
    return this.getElement(this.selectors.exploreIcon.android);
  }
  async cartIconEle(): Promise<Element<"async">> {
    return this.getElement(this.selectors.cartIcon.android);
  }
  async cartIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.cartIconText)
    );
  }
  async homeIconEle(): Promise<Element<"async">> {
    return this.getElement(this.selectors.homeIcon.android);
  }
  async homeIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.homeIconText)
    );
  }

  async welcomeMsgEle(): Promise<Element<'async'>>{
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver,this.selectors.welcomeMsg)),50000)
    return await this.getElement(XpathUtil.getXpath(this.driver,this.selectors.welcomeMsg))
  }
  async profileIcon(): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileIcon));
  }

  async tapOnProfileIcon() {
    await this.click(await this.profileIcon());
  }
}
