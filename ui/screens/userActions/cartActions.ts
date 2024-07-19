import { Browser } from 'webdriverio';
import { BaseScreen, CartScreen } from '../../../uiExport';
import { HomeScreen } from '../common/homeScreen';

export class CartActions extends BaseScreen {
  cartScreen: CartScreen;

  homeScreen: HomeScreen;

  constructor(driver: Browser<'async'>) {
    super(driver);
    this.cartScreen = new CartScreen(driver);
    this.homeScreen = new HomeScreen(driver);
  }

  async clickOnProduct() {
    const productCategoryEle = await this.cartScreen.productCategoryEle();
    await this.waitForDisplayed(productCategoryEle);

    await this.click(productCategoryEle);

    const productsEle = await this.cartScreen.productEle();
    await this.waitForDisplayed(productsEle[0]);
    await this.click(productsEle[0]);
  }

  async clickOnAddToCartButton() {
    const addToCartButtonEle = await this.cartScreen.addToCartButtonEle();
    await this.waitForDisplayed(addToCartButtonEle);
    await this.click(addToCartButtonEle);
  }

  async clickOnGoToCart() {
    const goToCartButtonEle = await this.cartScreen.goToCartButtonEle();
    await this.waitForDisplayed(goToCartButtonEle);
    await this.click(goToCartButtonEle);
  }

  async deleteProductInCart() {
    const deleteIcon = await this.cartScreen.deleteIconEle();
    await this.waitForDisplayed(deleteIcon);
    await this.click(deleteIcon);
    await this.waitForDisplayed(await this.cartScreen.deleteIconEle());
  }
}
