import chai from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework';
import authPage from '../../../page-objects/onboarding.auth';
import userData from '../../../../data/onboarding_fe/user.json';
import reporter from '../../../helper/reporter';

When(/^User enters login details (.*)$/, async function (mobileNumber) {
  try {
    await authPage.mobileNumberInput(
      this.testid,
      mobileNumber,
      this.scenario_data.personal_details.existing
    );
    await authPage.OTPInput(
      this.testid,
      mobileNumber,
      this.scenario_data.personal_details.existing
    );
  } catch (err) {
    err.message = `${this.testid}: Failed at property create page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});
When(/^Joint user selects application$/, async function () {
  try {
    await browser.pause(4000);
    await $('[data-im="auth-dashboard-property-card-0"]').click();
  } catch (err) {
    err.message = `${this.testid}: Failed at property create page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^Joint user reviews application$/, async function () {
  try {
    await browser.pause(4000);
    await $$("//*[normalize-space(text())='Review Application']")[1].click();
  } catch (err) {
    err.message = `${this.testid}: Failed at property create page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

/* temp disabled: for new sign in users

Then(/^User fills out customer details$/, async function (table) {
  await browser.pause(7000);
  try {
    const userDetails: string[] = [
      table.rowsHash().First_Name,
      table.rowsHash().Last_Name,
      table.rowsHash().Email,
    ];
    await authPage.signInForm(this.testid, userDetails, this.log_level);

    await $('.cta-button').click();
    await browser.pause(7000);
  } catch (err) {
    err.message = `${this.testid}: Failed at property create page, ${err.message}`;
    throw err;
  }
});
*/
