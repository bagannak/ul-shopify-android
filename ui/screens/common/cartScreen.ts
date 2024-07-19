import { Element } from 'webdriverio';
import { empty } from 'uuidv4';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class CartScreen extends BaseScreen {
  private selectors = {
    productCategory: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/img-category-Clothing"]',
      ios: "",
    },
    products: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/ele-product-card"]',
      ios: "",
    },

    addToCartButton: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/txt-add-to-cart']",
      ios: "",
    },

    goToCart: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/txt-go-to-cart']",
      ios: "",
    },

    productInCart: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-product-name"]',
      ios: "",
    },

    deleteIcon: {
      android: '//*[@resource-id="com.ultralesson.ulshopify:id/icon-delete"]',
      ios: "",
    },

    emptyCartMessage: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/txt-empty-cart-message']",
      ios: "",
    },
  };

  async productCategoryEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.productCategory)
    );
  }

  async addToCartButtonEle(): Promise<Element<"async">> {
    return await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.addToCartButton));
  }

  async goToCartButtonEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.goToCart)
    );
  }

  async productEle(): Promise<Element<"async">[]> {
    return await this.getElements(
      XpathUtil.getXpath(this.driver, this.selectors.products)
    );
  }

  async productInCartEle(): Promise<Element<"async">[]> {
    return await this.getElements(
      XpathUtil.getXpath(this.driver, this.selectors.productInCart)
    );
  }

  async getProductInCartEleName(): Promise<string> {
    const productsIncart = await this.productInCartEle();
    return await this.getText(productsIncart[0]);
  }

  async deleteIconEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.deleteIcon)
    );
  }

  async emptyCartMessageEle(): Promise<Element<"async">> {
    return await 
    this.getElement(this.selectors.emptyCartMessage.android);
  }
}
