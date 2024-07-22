import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
import { search } from 'superagent';

export class ExploreScreen extends BaseScreen {
  private selectors = {
   productCard:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/ele-product-card'])[1]",ios:""},
   noProductsFoundMsg:{android:"//*[@text='No products found.']",ios:""},
   searchInputBox:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/inp-search']",ios:""},
   backBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/icon-back']",ios:""}
  };

  async productCardEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.productCard)
      ),50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.productCard)
    );
  }

  async noProductsFoundMsgEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.noProductsFoundMsg)
      ),50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.noProductsFoundMsg)
    );
  }
  async searchInputBoxEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.searchInputBox)
      ),50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.searchInputBox)
    );
  }
  async backBtnEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.backBtn)
    );
  }
}
