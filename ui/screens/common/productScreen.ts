import { Element } from "webdriverio";
import { BaseScreen, XpathUtil } from "../../../uiExport";
export class ProductScreen extends BaseScreen{
    private selectors = {
        productTitle:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/txt-product-name']",ios:""},
        backBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-back']",ios:""}
    }

    async productTitleEle(): Promise<Element<"async">> {
        await this.waitForElementDisplayed(await this.getElement(
            XpathUtil.getXpath(this.driver, this.selectors.productTitle)
          ),50000)
        return this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.productTitle)
        );
      }

      async backBtnEle(): Promise<Element<"async">> {
        return this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.backBtn)
        );
      }
}