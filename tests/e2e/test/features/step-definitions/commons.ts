import { Given, When, Then } from '@cucumber/cucumber';
import globalPage from '../../page-objects/onboarding.global';
import scenarioData from '../../../data/onboarding_fe/scenarios.json';
import chai from 'chai';
import reporter from '../../helper/reporter';

Then('wait for {int} seconds', async function(time: number) {
  await browser.pause(time * 1000);
});
Then('clear local session data', async function() {
  await browser.execute('sessionStorage.clear()');
  await browser.execute('localStorage.clear()');
  await browser.deleteCookies();
  await browser.pause(5000);
});

Then(/^User directed to (.*) page$/, async function(url) {
  await browser.url(url);
});

Then(/^User moves to (.*) cascading form section$/, async function(content) {
  try {
    await globalPage.nextSection(this.testid, 'info');
  } catch (err) {
    err.message = `${this.testid}: Failed at next section, ${err.message}`;
    throw err;
  }
});
Then(/^User receives api error message$/, async function() {
  try {
    await chai.expect(
      $(
        `//*[contains(text(),"Your requested loan amount may be more than we can lend on this property. Reduce your loan amount to proceed.")]`
      )
    ).to.exist;
  } catch (err) {
    err.message = `${this.testid}: Failed at next section, ${err.message}`;
    throw err;
  }
});

Given(/^Set global data (.*)$/, async function(scenario) {
  const userData = scenarioData[scenario];
  this.scenario_data = userData;
});
Then(/^User completes form on page continue to next page$/, async function() {
  try {
    await globalPage.continueToNextPage(this.testid);
    // TODO: test to make sure next section title exists
  } catch (err) {
    // browser.debug();
    err.message = `${this.testid}: Failed: User completes form on page continue to next page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});
