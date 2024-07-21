import { Browser, Element } from "webdriverio";
import {
  BaseScreen,
  CartScreen,
  ExploreScreen,
  ExploreScreenActions,
} from "../../../uiExport";
import { HomeScreen } from "../common/homeScreen";

export class CartActions extends BaseScreen {
  cartScreen: CartScreen;
  homeScreen: HomeScreen;
  exploreScreen: ExploreScreen;
  exploreScreenActions: ExploreScreenActions;

  constructor(driver: Browser<"async">) {
    super(driver);
    this.cartScreen = new CartScreen(driver);
    this.homeScreen = new HomeScreen(driver);
    this.exploreScreen = new ExploreScreen(driver);
    this.exploreScreenActions = new ExploreScreenActions(driver);
  }
  async clickOnProduct() {
    // const productsEle = await this.cartScreen.productEle();
    // await this.waitForDisplayed(productsEle[0]);
    const product = await this.exploreScreen.productCardEle();
    await this.click(product);
  }

  async addMultipleProductToCart() {
    const productEleList = await this.cartScreen.productEle();
    productEleList.forEach(async (productEle) => {
      await this.click(productEle);
      await this.clickOnAddToCartButton();
      await this.exploreScreenActions.navigateBack(
        await this.exploreScreen.backBtnEle()
      );
    });
    await this.clickOnGoToCart();
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
    const deleteIcons = await this.cartScreen.deleteIconEle();
    deleteIcons.forEach(async (deleteIcon) => await this.click(deleteIcon));
  }

  async increaseTheItemQuantity() {
    const incrementButton = await this.cartScreen.incrementButtonEle();
    await this.waitForDisplayed(incrementButton);
    await this.click(incrementButton);
  }

  async decreaseTheItemQuantity() {
    const decrementButton = await this.cartScreen.decrementButtonEle();
    await this.waitForDisplayed(decrementButton);
    await this.click(decrementButton);
  }

  async clickOnContinueShoppingButton() {
    const continueShoppingButtonEle =
      await this.cartScreen.continueShoppingButtonEle();
    await this.waitForDisplayed(continueShoppingButtonEle);
    await this.click(continueShoppingButtonEle);
  }

  async clickOnPlaceOrderButton() {
    const placeOrderButtonEle = await this.cartScreen.placeOrderButtonEle();
    await this.waitForDisplayed(placeOrderButtonEle);
    await this.click(placeOrderButtonEle);
  }

  async clickOnBackButton() {
    await this.click(await this.cartScreen.backButtonEle());
  }

  async clickOnProductInCart() {
    await this.click(await this.cartScreen.productNameInCartEle());
  }
}
