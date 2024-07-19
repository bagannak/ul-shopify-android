/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { expect } from 'chai';
import {
  BaseScreen, Driver, HomeScreenActions, HomeScreen, ExploreScreen, ExploreScreenActions,
} from '../../../../uiExport';

/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;
let baseScreen: BaseScreen;
let exploreScreen: ExploreScreen;
let exploreScreenActions:ExploreScreenActions;
declare let reporter: any;
const specName = 'HomeScreen Validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    homeScreen = new HomeScreen(driver);
    baseScreen = new BaseScreen(driver);
    homeScreenActions = new HomeScreenActions(driver);
    exploreScreen = new ExploreScreen(driver);
    exploreScreenActions = new ExploreScreenActions(driver);
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  /**
 * it will verify login on both android and ios
 * pass os in env.properties file
 */

  it('Verify welcome message is displayed', async () => {
    expect(await baseScreen.isDisplayed(
      await homeScreen.welcomeMsgEle(),
    )).to.be.true;
  });
  it('Verify search bar is displayed', async () => {
    expect(await baseScreen.isDisplayed(
      await homeScreen.searchBtnEle(),
    )).to.be.true;
  });

  it('Verify navigation to "Clothing" category', async () => {
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('clothing'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });

  it('Verify navigation to "Shoes" category', async () => {
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('shoes'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });
  it('Verify navigation to "Furniture" category', async () => {
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('furniture'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });

  it.skip('Verify navigation to "Toys" category', async () => {
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('toys'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });

  it.skip('Verify navigation to "Audio sets" category', async () => {
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('audio sets'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });

  it.skip('Verify navigation to "Books" category', async () => {
    await baseScreen.click(await homeScreen.productCategoryEle('books'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });
});
