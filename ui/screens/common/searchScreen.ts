import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class ExploreScreen extends BaseScreen {
  private selectors = {
    backBtn:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/btn-back'])",ios:''},
    searchInput:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/inp-search']",ios:''},
    searchIcon:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-search']",ios:''},
  };





  async backBtnEle(): Promise<Element<'async'>> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.backBtn),
    );
}
    async searchInputEle(): Promise<Element<'async'>> {
        return this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.backBtn),
        );
    }
      
      async searchIconEle(): Promise<Element<'async'>> {
        return this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.backBtn),
        );
      }
}
