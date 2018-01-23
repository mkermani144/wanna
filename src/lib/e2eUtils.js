// eslint-disable-next-line import/no-extraneous-dependencies
import webdriver from 'selenium-webdriver';

const { By, Key } = webdriver;

const createDriver = () => new webdriver.Builder()
  .forBrowser('chrome')
  .build();
const utilsFactory = driver => ({
  init() {
    return driver.navigate().to('http://localhost:3000');
  },
  click(selector) {
    return driver.findElement(By.css(selector)).click();
  },
  async type(selector, text) {
    await driver.findElement(By.css(selector)).clear();
    return driver.findElement(By.css(selector)).sendKeys(text);
  },
  async count(selector) {
    return (await driver.findElements(By.css(selector))).length;
  },
  wait(ms) {
    return driver.sleep(ms);
  },
  pressEnter() {
    return driver.actions().sendKeys(Key.RETURN).perform();
  },
  pressRightArrow(times) {
    return driver.actions().sendKeys(...Array(times).fill(Key.ARROW_RIGHT)).perform();
  },
  close() {
    return driver.close();
  },
});

export {
  createDriver,
  utilsFactory,
};
