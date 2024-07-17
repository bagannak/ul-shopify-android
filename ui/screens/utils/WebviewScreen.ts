import { WebView } from './WebView';

export class WebViewScreen extends WebView {
  /**
   * Wait for the screen to be displayed based on Xpath
   */
  async waitForWebViewIsDisplayedByXpath(isShown = true): Promise<boolean | void> {
    const selector = (await this.driver.isAndroid)
      ? '*//android.webkit.WebView'
      : '*//XCUIElementTypeWebView';
    await (
      await this.getElement(selector)
    ).waitForDisplayed({
      timeout: 45000,
      reverse: !isShown,
    });
  }
}
