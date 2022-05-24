import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';

class PreAppPage extends Page {
  applyContinue: string;
  constructor() {
    super();
  }

  get applyContinueBtn() {
    return $(`[data-im="apply-intro-continue"]`);
  }

  async preAppApply(testid: string, expectedURL: string, logLevel: string) {
    if (!testid || !expectedURL) {
      throw Error(
        `When, testid: ${testid} OR expectedURL: ${expectedURL} are not valid`
      );
    }
    try {
      reporter.addStep(testid, 'debug', `preApp: /apply, preAppApply()`);

      const url = await browser.getUrl();
      await chai.expect(url).to.contain(expectedURL);

      await this.click(await this.applyContinueBtn);

      reporter.addStep(
        testid,
        'info',
        `preApp: /apply, preAppApply() successful`
      );
    } catch (err) {
      err.message = `preApp: /apply, preAppApply() failed`;
      throw err;
    }
  }

  get existingYesCustomerBtn() {
    return $(locators.pre_app.existing.buttons.EXISTING);
  }
  get existingNoCustomerBtn() {
    return $(locators.pre_app.existing.buttons.NEW);
  }

  async preAppExisting(
    testid: string,
    existingUser: boolean,
    expectedURL: string
  ) {
    if (!testid || existingUser == undefined || !expectedURL) {
      throw Error(
        `When, testid: ${testid} OR existingUser: ${existingUser} OR expectedURL: ${expectedURL} are not valid`
      );
    }
    const existingButton = existingUser
      ? this.existingYesCustomerBtn
      : this.existingNoCustomerBtn;

    try {
      reporter.addStep(
        testid,
        'debug',
        `preApp: /existing-customer, preAppExisting()`
      );

      const url = await browser.getUrl();
      await chai.expect(url).to.contain(expectedURL);

      await this.click(await existingButton);

      reporter.addStep(
        testid,
        'info',
        `preApp: /existing-customer, preAppExisting() successful`
      );
    } catch (err) {
      err.message = `preApp: /existing-customer, preAppExisting() failed`;
      throw err;
    }
  }

  get startNewAppBtn() {
    return $('button[data-im="auth-dashboard-add-more-button"]');
  }

  async startNewApp(testid: string) {
    if (!testid) {
      throw Error(`When, testid: ${testid}`);
    }

    try {
      reporter.addStep(testid, 'debug', `preApp: /dashboard, startNewApp()`);
      await this.waitForElement(await this.startNewAppBtn);
      await this.click(await this.startNewAppBtn);
      reporter.addStep(
        testid,
        'info',
        `preApp: /dashboard, startNewApp() successful`
      );
    } catch (err) {
      err.message = `preApp: /dashboard, startNewApp() failed`;
      throw err;
    }
  }
}
export default new PreAppPage();
