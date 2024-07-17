/**
 * @group Sanity
 */
import { Browser } from 'webdriverio';
import { expect } from 'chai';
import { Driver, DocsActions } from '../../../../uiExport';
/**
 * Docs page validation
 */
let driver: Browser<'async'>;
let docsActions: DocsActions;
declare let reporter: any;

const specName = 'Ekam home page validation';
describe('specName', () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    docsActions = new DocsActions(driver);
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  it('Docs Page Validation', async () => {
    const expectedGettingStartedText = 'Getting started';
    const result = await docsActions.isGettingStartedTextVisible(expectedGettingStartedText);
    expect(result).to.be.equal(true);
  });
});
