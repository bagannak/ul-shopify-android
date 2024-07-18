import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
import { profile } from 'console';

export class HomeScreen extends BaseScreen {
  private selectors = {

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

  async profileIconTextEle(): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileIconText))
  }
  async profileIcon(): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileIcon));
  }

  async tapOnProfileIcon() {
    await this.click(await this.profileIcon());
  }
}
