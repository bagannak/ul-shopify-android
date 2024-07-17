import { LOGGER } from '../../../webservicesExport';
import { BaseScreen } from '../base/baseScreen';

/**
 * Here you'll find some swipe methods for a native iOS or Android app
 */
export class SwipeUtil extends BaseScreen {
  SCREEN_SIZE: { width: number; height: number };

  /**
   * The values in the below object are percentages of the screen
   */
  SWIPE_DIRECTION = {
    down: {
      start: { x: 50, y: 15 },
      end: { x: 50, y: 85 },
    },
    left: {
      start: { x: 95, y: 50 },
      end: { x: 5, y: 50 },
    },
    right: {
      start: { x: 5, y: 50 },
      end: { x: 95, y: 50 },
    },
    up: {
      start: { x: 50, y: 85 },
      end: { x: 50, y: 15 },
    },
  };

  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   *
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  async checkIfVisibleWithScrollDown(element: string, maxScrolls: number, amount = 0) {
    const webElement = await this.getElement(element);
    if (
      (!(await webElement.isExisting()) || !(await webElement.isDisplayed()))
      && amount <= maxScrolls
    ) {
      await this.swipeUp(0.85);
      await this.checkIfVisibleWithScrollDown(element, maxScrolls, amount + 1);
    } else if (amount > maxScrolls) {
      throw new Error(`The element '${element}' could not be found or is not visible.`);
    }
  }

  /**
   * Swipe down based on a percentage
   * @param {float} percentage
   */
  async swipeDown(percentage = 1) {
    await this.swipeOnPercentage(
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.down.start, percentage),
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.down.end, percentage),
    );
  }

  /**
   * Swipe Up based on a percentage
   * @param {float} percentage from 0 - 1
   */
  async swipeUp(percentage = 1) {
    await this.swipeOnPercentage(
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.up.start, percentage),
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.up.end, percentage),
    );
  }

  /**
   * Swipe left based on a percentage
   * @param {float} percentage from 0 - 1
   */
  async swipeLeft(percentage = 1) {
    await this.swipeOnPercentage(
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.left.start, percentage),
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.left.end, percentage),
    );
  }

  /**
   * Swipe right based on a percentage
   * @param {float} percentage from 0 - 1
   */
  async swipeRight(percentage = 1) {
    await this.swipeOnPercentage(
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.right.start, percentage),
      await SwipeUtil.calculateXY(this.SWIPE_DIRECTION.right.end, percentage),
    );
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
   * percentages of the screen.
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 }
   *   const to = { x: 25, y:50 }
   * </pre>
   */
  async swipeOnPercentage(from: {}, to: {}) {
    this.SCREEN_SIZE = await this.driver.getWindowSize();
    LOGGER.info(`SCREEN_SIZE {width:${this.SCREEN_SIZE.width}, height:${this.SCREEN_SIZE.height}}`);
    const pressOptions = await SwipeUtil.getDeviceScreenCoordinates(this.SCREEN_SIZE, from);
    const moveToScreenCoordinates = await SwipeUtil.getDeviceScreenCoordinates(this.SCREEN_SIZE, to);
    await this.swipe(pressOptions, moveToScreenCoordinates);
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   *
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 }
   *   const to = { x: 25, y:50 }
   * </pre>
   */
  async swipe(from: {}, to: {}) {
    await this.driver.touchPerform([
      {
        action: 'press',
        options: from,
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'moveTo',
        options: to,
      },
      {
        action: 'release',
      },
    ]);
    this.driver.pause(1000);
  }

  /**
   * Get the screen coordinates based on a device his screensize
   * @param {number} screenSize the size of the screen
   * @param {object} coordinates like { x: 50, y: 50 }
   * @return {{x: number, y: number}}
   */
  static async getDeviceScreenCoordinates(screenSize: any, coordinates: any) {
    return {
      x: Math.round(screenSize.width * (coordinates.x / 100)),
      y: Math.round(screenSize.height * (coordinates.y / 100)),
    };
  }

  /**
   * Calculate the x y coordinates based on a percentage
   * @param {object} coordinates
   * @param {float} percentage
   * @return {{x: number, y: number}}
   */
  static async calculateXY({ x, y }: any, percentage: number) {
    return {
      x: x * percentage,
      y: y * percentage,
    };
  }
}
