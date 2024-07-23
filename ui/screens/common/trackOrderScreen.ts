import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
import { search } from 'superagent';

export class TrackOrderScreen extends BaseScreen {
  private selectors = {
  loginMsg:{android:"//*[@text='Log in to view and track your orders.']",ios:""},
   backBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-back']",ios:""}
  };

  
  async loginMsgEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.loginMsg)
      ),50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.loginMsg)
    );
  }
  async backBtnEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.backBtn)
    );
  }
}
