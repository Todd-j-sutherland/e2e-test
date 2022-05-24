import chai from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework';
import applicant_details from '../../../../data/onboarding_fe/personal_details.json';
import user from '../../../../data/onboarding_fe/user.json';
import reporter from '../../../helper/reporter';
import personalDetailsPage from '../../../page-objects/onboarding.personal_details';
import globalPage from '../../../page-objects/onboarding.global';
import constants from '../../../../data/onboarding_fe/constants.json';

Then(/^User directed to employment section$/, async function () {
  await browser.pause(7000);
  await browser.url(
    'https://dev-apply.verteva.com.au/0d5c6104-5459-f96a-b422-8e002436daae/financial/add-bank'
  );
  await browser.pause(7000);
});

When(/^User continues on the profile landing$/, async function () {
  try {
    await globalPage.continueToNextPage(this.testid);
    // const expectedURL = table.rowsHash().URL;
    // const url = await browser.getUrl();
    // chai.expect(url).to.contain(expectedURL);
    await browser.pause(2000);
  } catch (err) {
    err.message = `${this.testid}: Failed at profile landing page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(
  /^User completes personal details section on applicant details page$/,
  async function () {
    try {
      const DOB = this.scenario_data.personal_details.licence.DOB;
      const driverLicense =
        this.scenario_data.personal_details.licence.driver_license;
      const noMiddleName =
        this.scenario_data.personal_details.licence.no_middle_name;
      await personalDetailsPage.personalDetails(
        this.testid,
        noMiddleName,
        DOB,
        driverLicense
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at applicant details section 01, ${err.message}`;
      throw err;
    }
  }
);

Then(/^User completes contact details section$/, async function () {
  const homeAddress =
    this.scenario_data.personal_details.contact_details.homeAddress;
  try {
    await personalDetailsPage.contactDetails(this.testid, homeAddress);
  } catch (err) {
    err.message = `${this.testid}: Failed at contact details section 02, ${err.message}`;
    throw err;
  }
});

Then(/^User completes household finances section$/, async function () {
  const applyOn =
    this.scenario_data.personal_details.household_finances.apply_on;
  const dependantNumber =
    this.scenario_data.personal_details.household_finances.dependent_number;
  try {
    await browser.pause(4000);
    await personalDetailsPage.householdFinances(
      this.testid,
      applyOn,
      dependantNumber
    );
  } catch (err) {
    let storageData = await browser.execute(
      "return window.sessionStorage.getItem('vuex');"
    );
    //@ts-ignore
    storageData = JSON.parse(storageData);
    await reporter.addStep(
      this.testid,
      'warn',
      //@ts-ignore
      JSON.stringify(storageData.user)
    );
    // await browser.refresh();
    // await browser.debug();
    // await browser.pause(6000);
    // await browser.debug();
    err.message = `${this.testid}: Failed at household finances section 03, ${err.message}`;
    throw err;
  }
});

Then(/^User completes tax information section$/, async function () {
  const taxResident = this.scenario_data.personal_details.tax_info.tax_resident;
  try {
    await personalDetailsPage.taxInformation(this.testid, taxResident);
  } catch (err) {
    err.message = `${this.testid}: Failed at tax information section 04, ${err.message}`;
    globalPage.throwError(err);
    // throw err;
  }
});

Then(/^User continues to add employment$/, async function (table) {
  try {
    await globalPage.continueToNextPage(this.testid);
    const expectedURL = table.rowsHash().URL;
    const url = await browser.getUrl();
    await chai.expect(url).to.contain(expectedURL);
    await browser.pause(2000);
  } catch (err) {
    err.message = `${this.testid}: Failed at profile/add-employment, ${err.message}`;
    globalPage.throwError(err);
  }
});

Then(/^User completes your employment section$/, async function () {
  try {
    const employment =
      this.scenario_data.personal_details.employment.employment;
    const employment_list = constants.EMPLOYMENT_LIST;
    await personalDetailsPage.yourEmployment(this.testid, employment);
    if (employment_list.includes(constants.Employment_full_time)) {
      await personalDetailsPage.fulltimePAYG(this.testid);
    }
    await browser.pause(2000);
  } catch (err) {
    err.message = `${this.testid}: Failed at your employment section 01, ${err.message}`;
    globalPage.throwError(err);
  }
});

Then(
  /^User completes your income section (.*),(.*),(.*)$/,
  async function (incomeReduce, incomeChange, carAllowance) {
    try {
      await personalDetailsPage.yourIncome(
        this.testid,
        incomeReduce,
        incomeChange,
        carAllowance
      );
      await browser.pause(2000);
    } catch (err) {
      err.message = `${this.testid}: Failed at your income section 02, ${err.message}`;
      throw err;
    }
  }
);

Then(/^User completes Joint applicant details$/, async function () {
  console.log(this.scenario_data.personal_details.joint_app.contact_details);
  try {
    await personalDetailsPage.jointAppContactDetails(
      this.testid,
      this.scenario_data
    );
    await browser.pause(2000);
  } catch (err) {
    err.message = `${this.testid}: Failed at your income section 02, ${err.message}`;
    throw err;
  }
});

Then(/^User keep going for joint applicant$/, async function () {
  const buttonContinue = await $$("//button[@type='button']")[1];

  try {
    await browser.pause(5000);
    await buttonContinue.click();
    await browser.pause(2000);
  } catch (err) {
    err.message = `${this.testid}: Failed at your income section 02, ${err.message}`;
    throw err;
  }
});
