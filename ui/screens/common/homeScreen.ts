import { Element } from "webdriverio";
import { BaseScreen, XpathUtil } from "../../../uiExport";
import { profile } from "console";

export class HomeScreen extends BaseScreen {
  private selectors = {
    welcomeMsg:{android:"//*[@text='Welcome Back!!']",ios:""},
    searchBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-search']",ios:""},
    profileIconText: { android: "//*[@text='Profile']", ios: "" },
    profileIcon: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-profile']",
      ios: "",
    },
    homeIcon: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-home']",
      ios: "",
    },
    homeIconText: { android: "//*[@text='Home']", ios: "" },
    cartIcon: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-cart']",
      ios: "",
    },
    cartIconText: { android: "//*[@text='Cart']", ios: "" },
    exploreIcon: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/icon-explore']",
      ios: "",
    },
    exploreIconText: { android: "//*[@text='Explore']", ios: "" },
    trackIcon: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/icon-track-order']",
      ios: "",
    },
    trackIconText: { android: "//*[@text='Track']", ios: "" },
    productCategory: {
      clothing: { android: "//*[@text='Clothing']", ios: "" },
      shoes: { android: "//*[@text='Shoes']", ios: "" },
      furniture: { android: "//*[@text='Furniture']", ios: "" },
      toys: { android: "//*[@text='Toys']", ios: "" },
      audioSets: { android: "//*[@text='Audio sets']", ios: "" },
      books: { android: "//*[@text='Books']", ios: "" },
    },
    productCategoryScroll:{android:"(//*[@class='android.widget.HorizontalScrollView'])[1]",ios:''},
    newArrivals:{android:"(//*[@class='android.widget.HorizontalScrollView'])[2]",ios:""},
    itemInNewArrivalSection:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/ele-featured-row-card'])[1]",ios:""},
    newArrivalsDescription:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/txt-featured-row-description'])[1]",ios:""},
    trendingProducts:{android:"(//*[@class='android.widget.HorizontalScrollView'])[3]",ios:""},
    itemInTrendingProductsSection:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/ele-featured-row-card'])[3]",ios:""},
    trendingProductsDescription:{android:"(//*[@resource-id='com.ultralesson.ulshopify:id/txt-featured-row-description'])[2]",ios:""},
   registerationSuccessfulMsg: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-modal-message']", ios: "" }
  };
  
  async profileIconTextEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.profileIconText)
    );
  }
  async profileIcon(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileIcon)), 50000)
    return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileIcon));
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

  async welcomeMsgEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(
      await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.welcomeMsg)
      ),
      50000
    );
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.welcomeMsg)
    );
  }

  async searchBtnEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.searchBtn)
    );
  }
  async productCategoryEle(category: String): Promise<Element<"async">> {
    if (category == "clothing") {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(
            this.driver,
            this.selectors.productCategory.clothing
          )
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.productCategory.clothing)
      );
    } else if (category == "shoes") {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(
            this.driver,
            this.selectors.productCategory.clothing
          )
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.productCategory.shoes)
      );
    } else if (category == "furniture") {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(
            this.driver,
            this.selectors.productCategory.furniture
          )
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(
          this.driver,
          this.selectors.productCategory.furniture
        )
      );
    } else if (category == "toys") {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.productCategory.toys)
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.productCategory.toys)
      );
    } else if (category == "audio sets") {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(
            this.driver,
            this.selectors.productCategory.audioSets
          )
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(
          this.driver,
          this.selectors.productCategory.audioSets
        )
      );
    } else {
      await this.waitForElementDisplayed(
        await this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.productCategory.books)
        ),
        50000
      );
      return await this.getElement(
        XpathUtil.getXpath(this.driver, this.selectors.productCategory.books)
      );
    }
  }
  async productCategoryScrollEle():Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.productCategoryScroll)), 50000)
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.productCategoryScroll)
    );
  }

  async regSuccessMsg(): Promise<Element<'async'>> {
    await this.waitForDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerationSuccessfulMsg)))
    return await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerationSuccessfulMsg));
  }

  async newArrivalsEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.newArrivals)), 50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.newArrivals)
    );
  }
  async itemInNewArrivalsSectionEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.itemInNewArrivalSection)), 50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.itemInNewArrivalSection)
    );
  }
  async newArrivalsDescriptionEle():Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.newArrivalsDescription)), 50000)
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.newArrivalsDescription)
    );
  }

  async trendingProductsEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.trendingProducts)), 50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.trendingProducts)
    );
  }
  async itemInTrendingProductsSectionEle(): Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.itemInTrendingProductsSection)), 50000)
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.itemInTrendingProductsSection)
    );
  }
  async trendingProductsDescriptionEle():Promise<Element<"async">> {
    await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.newArrivalsDescription)), 50000)
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.trendingProductsDescription)
    );
  }
  async isUserOnHomeScreen() {
    return await this.isDisplayed(await this.welcomeMsgEle());
  }

  async isRegSuccessMsgDisplayed() {
    return this.isDisplayed(await this.regSuccessMsg());
  }
}
