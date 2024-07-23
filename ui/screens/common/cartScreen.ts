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

    incrementButton: {
      android: '//*[@resource-id="com.ultralesson.ulshopify:id/btn-increment"]',
      ios: "",
    },

    decrementButton: {
      android: '//*[@resource-id="com.ultralesson.ulshopify:id/btn-decrement"]',
      ios: "",
    },

    totalAmount: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-basket-total"]',
      ios: "",
    },

    quantityCount: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-product-quantity"]',
      ios: "",
    },

    continueShoppingButton: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-continue-shopping"]',
      ios: "",
    },

    placeOrderButton: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/btn-place-order']",
      ios: "",
    },

    orderPlacedSuccessMsg: {
      android:
        "//*[@resource-id='com.ultralesson.ulshopify:id/txt-thanks-shopping']",
      ios: "",
    },

    productNameInCart: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-product-name"]',
      ios: "",
    },

    productPriceInCart: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/txt-product-price"]',
      ios: "",
    },

    productImageIncart: {
      android:
        '//*[@resource-id="com.ultralesson.ulshopify:id/img-cart-product-elegant-suite"]',
      ios: "",
    },

    productPage: {
      android: "//*[resource-id='com.ultralesson.ulshopify:id/img-product']",
      ios: "",
    },

    backButton: {
      android: "//*[resource-id='com.ultralesson.ulshopify:id/btn-back']",
      ios: "",
    },
  };

  async productCategoryEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.productCategory)
    );
  }

  async addToCartButtonEle(): Promise<Element<"async">> {
    return await this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.addToCartButton)
    );
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

  async deleteIconEle(): Promise<Element<"async">[]> {
    return await this.getElements(
      XpathUtil.getXpath(this.driver, this.selectors.deleteIcon)
    );
  }

  async emptyCartMessageEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.emptyCartMessage.android);
  }

  async incrementButtonEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.incrementButton.android);
  }

  async decrementButtonEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.decrementButton.android);
  }

  async totalAmountEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.totalAmount.android);
  }

  async getTotalAmount(): Promise<string> {
    const totalAmountEle = await this.totalAmountEle();
    return await this.getText(totalAmountEle);
  }

  async quantityCountEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.quantityCount.android);
  }

  async getQuantityCount(): Promise<string> {
    const quantityCountEle = await this.quantityCountEle();
    return await this.getText(quantityCountEle);
  }

  async continueShoppingButtonEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.continueShoppingButton.android);
  }

  async placeOrderButtonEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.placeOrderButton.android);
  }

  async orderPlacedSuccessMsgEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.orderPlacedSuccessMsg.android);
  }

  async getorderPlacedSuccessMsgText(): Promise<string> {
    const quantityCountEle = await this.orderPlacedSuccessMsgEle();
    await this.waitForDisplayed(quantityCountEle);
    return await this.getText(quantityCountEle);
  }

  async productNameInCartEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.productNameInCart.android);
  }

  async productPriceInCartEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.productPriceInCart.android);
  }

  async productImageInCartEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.productImageIncart.android);
  }

  async productPageEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.productPage.android);
  }

  async backButtonEle(): Promise<Element<"async">> {
    return await this.getElement(this.selectors.backButton.android);
  }
}
