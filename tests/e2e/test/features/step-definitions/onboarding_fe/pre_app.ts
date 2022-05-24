import { Given, When, Then } from '@wdio/cucumber-framework';
import userData from '../../../../data/onboarding_fe/user.json';
import reporter from '../../../helper/reporter';
import preAppPage from '../../../page-objects/onboarding.pre_app';

Given(/^Onboarding (.*) is opened$/, async function(url) {
  reporter.addStep(
    this.testid,
    'debug',
    `start - Opening ${url} onboarding page`
  );

  await browser.url(url);
  await browser.pause(5000);
  reporter.addStep(
    this.testid,
    'info',
    `successful - Opened ${url} onboarding page`
  );
});

When(/^User completes preApp apply page$/, async function() {
  const expectedURL = '/apply';
  try {
    await preAppPage.preAppApply(this.testid, expectedURL, 'info');
  } catch (err) {
    err.message = `${this.testid}: Failed: User completes preApp apply page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

When(/^User completes preApp existing-customer page$/, async function() {
  const existingUser = userData.existing;
  const expectedURL = '/existing-customer';

  try {
    await preAppPage.preAppExisting(this.testid, existingUser, expectedURL);
  } catch (err) {
    err.message = `${this.testid}: Failed: User completes preApp existing-customer page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

When(/^User starts new application$/, async function() {
  try {
    await preAppPage.startNewApp(this.testid);
  } catch (err) {
    err.message = `${this.testid}: Failed: User completes preApp existing-customer page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});
