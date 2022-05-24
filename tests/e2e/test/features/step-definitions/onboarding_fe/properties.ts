import chai from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework';
import reporter from '../../../helper/reporter';
import property from '../../../../data/onboarding_fe/property.json';
import manual_address from '../../../../data/onboarding_fe/property_manual_address.json';
import propertiesPage from '../../../page-objects/onboarding.properties';
import globalPage from '../../../page-objects/onboarding.global';

When(/^User completes intent property create page$/, async function () {
  const expectedURL: string = '/property/create';
  const propertyIntent: string = this.scenario_data.property.property_intent;
  const propertyUse: string = this.scenario_data.property.property_use;
  const propertyTitleText: string =
    this.scenario_data.property.property_cascading_form_sections.section_1;
  const formTitleSelector: string = `//span[@id="1"]//span[contains(text(),"${propertyTitleText}")]`;

  try {
    await propertiesPage.propertiesIntent(
      this.testid,
      propertyIntent,
      expectedURL
    );

    await globalPage.expectedValueMatch(
      this.testid,
      formTitleSelector,
      propertyTitleText
    );
    await propertiesPage.propertiesUse(this.testid, propertyUse, expectedURL);
  } catch (err) {
    err.message = `${this.testid}: Failed at property create page, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^User completes property address Section$/, async function () {
  // updated with global scenarios
  const exclusion: boolean = this.scenario_data.property.property_exclusion;
  const propertyTitleText: string =
    this.scenario_data.property.property_cascading_form_sections.section_2;
  const formTitleSelector: string = `//span[@id="2"]//span[contains(text(),"${propertyTitleText}")]`;
  const propertyAddress: string = this.scenario_data.property.property_address;

  try {
    await propertiesPage.propertiesAddressType(this.testid, propertyAddress);
    await propertiesPage.propertiesAddress(
      this.testid,
      propertyAddress,
      exclusion
    );
    await globalPage.expectedValueMatch(
      this.testid,
      formTitleSelector,
      propertyTitleText
    );
  } catch (err) {
    err.message = `${this.testid}: Failed at property address section, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(/^User completes manual address Section$/, async function () {
  try {
    await propertiesPage.propertiesAddressType(
      this.testid,
      this.scenario_data.property.property_address
    );
    await propertiesPage.propertiesManualAddress(
      this.testid,
      this.scenario_data.property.manualAddress
    );
    await chai.expect(
      $(`//*[contains(text(),"It's not you, it's us...")]`)
    ).to.exist;
  } catch (err) {
    err.message = `${this.testid}: Failed at manual property address section, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(
  /^User completes estimated value property create page$/,
  async function () {
    const propertyTitleText: string =
      this.scenario_data.property.property_cascading_form_sections.section_3;
    const formTitleSelector: string = `//span[@id="3"]//span[contains(text(),"${propertyTitleText}")]`;
    try {
      await propertiesPage.propertiesEstimatedValue(
        this.testid,
        this.scenario_data.property.property_estimated_value
      );
      await globalPage.expectedValueMatch(
        this.testid,
        formTitleSelector,
        propertyTitleText
      );
      await propertiesPage.propertiesOwnership(
        this.testid,
        this.scenario_data.property.property_ownership
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at property estimated value section, ${err.message}`;
      reporter.addStep(this.testid, 'error', err.message);
      throw err;
    }
  }
);

Then(/^User property type has too many floors$/, async function () {
  try {
    await $(
      "[data-im='create-properties-property_type-input'] .v-select.ph-autocomplete__v-select"
    ).click();
    await propertiesPage.propertiesType(this.testid, 'Unit');
    await $(
      "[data-im='create-properties-declared_number_of_storeys-input'] .v-select.ph-autocomplete__v-select"
    ).click();
    await propertiesPage.propertiesType(this.testid, '8');
    await chai.expect(
      $(
        `//*[contains(text(),"We review the location as part of our assessment. Unfortunately, we’re not currently able to provide a Nano home loan for this address.")]`
      )
    ).to.exist;
  } catch (err) {
    err.message = `${this.testid}: Failed at property estimated value section, ${err.message}`;
    reporter.addStep(this.testid, 'error', err.message);
    throw err;
  }
});

Then(
  /^User completes outstanding loan property create page$/,
  async function () {
    const propertyTitleText: string =
      this.scenario_data.property.property_cascading_form_sections.section_4;
    const formTitleSelector: string = `//span[@id="4"]//span[contains(text(),"${propertyTitleText}")]`;
    try {
      await propertiesPage.propertiesOutstandingLoan(
        this.testid,
        this.scenario_data.property.property_outstanding_loan
      );

      await globalPage.expectedValueMatch(
        this.testid,
        formTitleSelector,
        propertyTitleText
      );
      await propertiesPage.propertiesCurrentRate(
        this.testid,
        this.scenario_data.property.property_current_interest_rate
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at property outstanding loan section, ${err.message}`;
      reporter.addStep(this.testid, 'error', err.message);
      throw err;
    }
  }
);
