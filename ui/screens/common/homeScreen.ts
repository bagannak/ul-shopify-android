import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
import { profile } from 'console';

export class HomeScreen extends BaseScreen {
  private selectors = {
    productLabel: { android: "//*[@text='PRODUCTS']", ios: "//*[@name='inp-fullname']" },
    profileIconText:{android:"//*[@text='Profile']",ios:""},
    profileIcon:{android:"com.ultralesson.ulshopify:id/icon-profile",ios:""},
    homeIcon:{android:"com.ultralesson.ulshopify:id/icon-home"},
    homeIconText:{android:"//*[@text='Home']"},
    cartIcon:{android:"com.ultralesson.ulshopify:id/icon-cart"},
    cartIconText:{android:"//*[@text='Cart']"},
    exploreIcon:{android:"com.ultralesson.ulshopify:id/icon-explore"},
    exploreIconText:{android:"//*[@text='Explore']"},
    trackIcon:{android:"com.ultralesson.ulshopify:id/icon-track-order"},
    trackIconText:{android:"//*[@text='Track']"}
  };

  async productLabelEle(): Promise<Element<'async'>> {
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.productLabel));
  }
}
