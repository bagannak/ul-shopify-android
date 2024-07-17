import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
import { profile } from 'console';

export class HomeScreen extends BaseScreen {
  private selectors = {
    productLabel: { android: "//*[@text='PRODUCTS']", ios: "//*[@name='inp-fullname']" }
  };

  async productLabelEle(): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.productLabel));
  }
}
