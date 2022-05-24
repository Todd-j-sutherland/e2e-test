import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import { assert, expect } from 'chai';
class GlobalPage extends Page {
  applyContinue: string;
  constructor() {
    super();
  }
  async throwError(err) {
    // await browser.debug();
    // expect(true).to.equal(false);
    throw err;
  }
  get nextButton() {
    return $$(`//button[contains(@data-im,'-next-btn')]`);
  }
  get nextButtonJointAccept() {
    return $$(`//button[@type='button']`);
  }

  async nextSection(testid: string, logLevel: string) {
    if (!testid || !logLevel) {
      throw Error(`When, testid: ${testid} OR ${logLevel} are not valid`);
    }
    try {
      await this.browserPause(4000);
      for (let i = 0; i < (await this.nextButton.length); i++) {
        const result = await this.nextButton[i];
        if (await result.isDisplayed()) {
          await this.click(result);

          await this.browserPause(2000);
          break;
        }
      }
      const getCurrentUrl = await browser.getUrl();

      if (getCurrentUrl.includes('/profile/joint-applicant-details')) {
        this.click(this.nextButtonJointAccept[2]);
      }
    } catch (err) {
      err.message = `next button is not there`;
      this.throwError(err);
      // throw err;
    }
  }

  get continueButton() {
    return $(`[data-im="cta-continue"]`);
  }

  async continueToNextPage(testid: string) {
    if (!testid) {
      throw Error(`When, testid: ${testid} are not valid`);
    }
    try {
      await this.browserPause(5000);
      await this.click(await this.continueButton);
      await this.browserPause(3000);
    } catch (err) {
      err.message = `continue button is not there`;
      await this.throwError(err);
      // throw err;
    }
  }

  async expectedValueMatch(testid: string, elSelector: any, valueData: any) {
    if (!testid) {
      throw Error(`When, testid: ${testid} are not valid`);
    }
    const valueUI = await $(elSelector).getText();
    try {
      await chai.expect(valueUI).to.eq(valueData);
    } catch (err) {
      err.message = `${valueUI} does not match ${valueData}`;
      throw err;
    }
  }
}
export default new GlobalPage();
