import { Given, When, Then } from '@wdio/cucumber-framework';

import loans from '../../../../data/onboarding_fe/loans.json';
import reporter from '../../../helper/reporter';
import loansPage from '../../../page-objects/onboarding.loans';
import globalPage from '../../../page-objects/onboarding.global';

Then(/^User completes loan features section$/, async function () {
  const loanFeatures = loans.loan_features;
  try {
    await loansPage.loanFeatures(this.testid, loanFeatures);
    await loansPage.saveLoanFeatures(this.testid);
  } catch (err) {
    err.message = `${this.testid}: Failed: User completes loan features section, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});
