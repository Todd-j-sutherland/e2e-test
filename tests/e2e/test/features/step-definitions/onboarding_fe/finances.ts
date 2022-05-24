import { Then } from '@wdio/cucumber-framework';
import financialPage from '../../../page-objects/onboarding.finances';
import globalPage from '../../../page-objects/onboarding.global';
import locator from '../../../../data/onboarding_fe/locators.json';
import reporter from '../../../helper/reporter';

Then(/^User chooses bank$/, async function () {
  try {
    if (this.testid === 'OB_TC101_NANO') {
      // const firstName = 'SingleInvPI'; preprod
      const firstName = 'TestTenn';
      await globalPage.expectedValueMatch(
        this.testid,
        'h1',
        'Welcome back ' + firstName
      );
      await browser.pause(4000);
      await $$("//*[contains(@type,'button')]")[2].click();
      await globalPage.expectedValueMatch(
        this.testid,
        locator.finances.add_bank.NANO_BANK_STATUS,
        'Digital Mortgage Solutions Pty Ltd'
      );
      await financialPage.needHelp(this.testid);
      // await financialPage.addOtherBank(this.testid);
    }

    await financialPage.bankSelection(this.testid, 'Bank Of Statements');
  } catch (err) {
    err.message = `${this.testid}: Failed: User chooses bank, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^User checks account details$/, async function () {
  try {
    if (this.testid === 'OB_TC101_NANO') {
      await globalPage.expectedValueMatch(
        this.testid,
        locator.finances.account_details.NANO_ACCOUNT,
        'Your Nano account'
      );
    }
  } catch (err) {
    err.message = `${this.testid}: Failed: User checks account details, ${err.message}`;
    throw err;
  }
});

Then(/^User adds loans$/, async function () {
  try {
    await financialPage.loanSelection(this.testid);
  } catch (err) {
    err.message = `${this.testid}: Failed: User adds loans, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^User adds an additional loans$/, async function () {
  try {
    await financialPage.additionalLoanSelection(this.testid);
  } catch (err) {
    err.message = `${this.testid}: Failed: User adds loans, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^User adds liability$/, async function () {
  try {
    await financialPage.addLiability(this.testid);
  } catch (err) {
    err.message = `${this.testid}: Failed: User adds liability, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});
