import chai from 'chai';
import global from './onboarding.global';
export default class Page {
  constructor() {}

  async navigateTo(path: string) {
    await browser.url(path);
  }

  async click(ele: WebdriverIO.Element) {
    await ele.waitForClickable({ timeout: 15000 });
    if (!ele.elementId) {
      // throw Error(ele.error.message);
      global.throwError(ele.error);
    }
    await ele.click();
  }

  async typeInto(ele: WebdriverIO.Element, text: string) {
    await ele.waitForDisplayed({ timeout: 15000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.setValue(text);
  }

  async browserPause(duration: number) {
    if (!duration) duration = 3000;
    await browser.pause(duration);
  }

  async waitForPage() {
    await browser.waitUntil(
      async function () {
        const state = await browser.execute(function () {
          return document.readyState;
        });
        return state === 'complete';
      },
      {
        timeout: 30000,
        timeoutMsg: 'page did not load',
      }
    );
  }

  async waitForElement(ele) {
    await ele.waitForDisplayed({ timeout: 15000 });
    if (await !ele.elementId) {
      throw Error(ele.error.message + ' ' + ele);
    }
    await ele.scrollIntoView();
  }

  async loopChildren(children_list: any, value: string, error_message: string) {
    try {
      for (let index = 0; index < (await children_list.length); index++) {
        let element = await children_list[index].getText();
        if (value === element) {
          await this.click(await children_list[index]);
          break;
        }
      }
    } catch (err) {
      err.message = error_message;
      throw err;
    }
  }
}
