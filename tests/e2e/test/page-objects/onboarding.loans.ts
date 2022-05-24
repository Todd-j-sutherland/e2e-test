import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';

class LoansPage extends Page {
  applyContinue: string;
  constructor() {
    super();
  }

  get loanFeaturesOptions() {
    return $$(locators.loans.LOAN_FEATURES_OPTIONS);
  }

  async loanFeatures(testid: string, loanFeatures: string) {
    if (!testid || !loanFeatures) {
      throw Error(
        `When, testid: ${testid} OR noMiddleName: ${loanFeatures} are not valid`
      );
    }
    reporter.addStep(testid, 'debug', `loans: loan/create loan features`);
    await this.waitForElement(this.loanFeaturesOptions[0]);
    this.loopChildren(
      this.loanFeaturesOptions,
      loanFeatures,
      'loans: loanFeaturesOptions() failed'
    );
    reporter.addStep(
      testid,
      'info',
      `loans: loan/create loan features successful`
    );
    await this.browserPause(2000);
  }

  get saveChangeBtn() {
    return $(locators.loans.SAVE_CHANGE_BTN);
  }
  async saveLoanFeatures(testid: string) {
    if (!testid) {
      throw Error(`When, testid: ${testid} is not valid`);
    }
    reporter.addStep(testid, 'debug', `loans: loan/create save change`);
    await this.waitForElement(this.saveChangeBtn);
    await this.click(await this.saveChangeBtn);
    reporter.addStep(testid, 'info', `loans: loan/create save change success`);
    await this.browserPause(2000);
  }
}

export default new LoansPage();
