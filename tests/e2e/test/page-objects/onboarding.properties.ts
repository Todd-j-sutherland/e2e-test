import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';

class PropertiesPage extends Page {
  applyContinue: string;
  constructor() {
    super();
  }

  get purchaseIntentBtn() {
    return $(
      locators.properties.property_intent.intent.PURCHASE
    ).parentElement();
  }
  get refinanceIntentBtn() {
    return $(
      locators.properties.property_intent.intent.REFINANCE
    ).parentElement();
  }
  //---------------------------------
  async propertiesIntent(
    testid: string,
    propertyIntent: string,
    expectedURL: string
  ) {
    if (!testid || !expectedURL || !propertyIntent) {
      throw Error(
        `When, testid: ${testid} OR expectedURL: ${expectedURL} OR ${propertyIntent} are not valid`
      );
    }

    await this.waitForElement(await this.refinanceIntentBtn);
    await this.waitForElement(await this.purchaseIntentBtn);

    const propertyIntentRadio =
      propertyIntent === 'Refinance'
        ? await this.refinanceIntentBtn
        : await this.purchaseIntentBtn;

    try {
      reporter.addStep(
        testid,
        'debug',
        `property intent: /property/create, propertiesIntent()`
      );

      const url = await browser.getUrl();
      await chai.expect(url).to.contain(expectedURL);

      // await this.browserPause(2000);

      await this.click(propertyIntentRadio);

      reporter.addStep(
        testid,
        'info',
        `property intent: /property/create, propertiesIntent() successful `
      );
    } catch (err) {
      err.message = `property intent: /property/create, propertiesIntent() failed`;
      throw err;
    }
  }

  //-----------------------------------

  get myHomeUseBtn() {
    return $(locators.properties.property_intent.use.HOME);
  }
  get investmentUseBtn() {
    return $(locators.properties.property_intent.use.INVESTMENT);
  }

  async propertiesUse(
    testid: string,
    propertyUse: string,
    expectedURL: string
  ) {
    if (!testid || !expectedURL) {
      throw Error(
        `When, testid: ${testid} OR expectedURL: ${expectedURL} are not valid`
      );
    }
    await this.waitForElement(await this.investmentUseBtn);
    await this.waitForElement(await this.myHomeUseBtn);
    const propertyIntentRadio =
      propertyUse === 'Investment' ? this.investmentUseBtn : this.myHomeUseBtn;

    try {
      reporter.addStep(
        testid,
        'debug',
        `property intent: /property/create, propertiesUse()`
      );

      const url = await browser.getUrl();
      await chai.expect(url).to.contain(expectedURL);

      await this.click(await propertyIntentRadio);

      reporter.addStep(
        testid,
        'info',
        `property intent: /property/create, propertiesUse() successful`
      );
    } catch (err) {
      err.message = `property intent: /property/create, propertiesUse() failed`;
      throw err;
    }
  }

  get propertyInputAddress() {
    return $(locators.properties.property_address.ADDRESS_INPUT);
  }

  async propertiesAddressType(testid: string, propertyAddress: string) {
    if (!testid || !propertyAddress) {
      throw Error(
        `When, testid: ${testid} OR propertyAddress: ${propertyAddress} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'debug',
      `property address type: /property/create, propertiesAddressType()`
    );

    try {
      await this.waitForElement(await this.propertyInputAddress);

      await this.propertyInputAddress.setValue(propertyAddress);
    } catch (err) {
      err.message = `property address type: /property/create, propertiesAddressType() failed`;
      throw err;
    }

    await this.browserPause(2000);

    reporter.addStep(
      testid,
      'info',
      `property address type: /property/create, propertiesAddressType() successful`
    );
  }

  get dropdownMenuItems() {
    return $$(locators.properties.property_address.DROPDOWN_LIST);
  }
  get notYouMeText() {
    return $('.tw-font-bold.ph-text-lg');
  }

  async propertiesAddress(
    testid: string,
    propertyAddress: string,
    exclude: boolean
  ) {
    if (!testid || !propertyAddress) {
      throw Error(
        `When, testid: ${testid} OR propertyAddress: ${propertyAddress} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'debug',
      `property address: /property/create, propertiesAddress()`
    );

    await this.browserPause(6000);
    await this.waitForElement(await this.dropdownMenuItems[0]);

    try {
      for (
        let index = 0;
        index < (await this.dropdownMenuItems.length);
        index++
      ) {
        let element = await this.dropdownMenuItems[index].getText();
        if (propertyAddress === element) {
          await this.click(await this.dropdownMenuItems[index]);
          break;
        }
      }
      if (await exclude) {
        await this.waitForElement(await this.notYouMeText);
        chai
          .expect(await this.notYouMeText.getText())
          .to.contain("It's not you, it's us");
      }
      await this.browserPause(6000);
    } catch (err) {
      err.message = `property address: /property/create, propertiesAddress() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `property address: /property/create, propertiesAddress() successful`
    );
  }

  get manualAddressBtn() {
    return $(locators.properties.property_address.MANUAL_ADDRESS_BTN);
  }
  get unitNumberInput() {
    return $(
      locators.properties.property_address.manual_address_form.UNIT_NUMBER_INPUT
    );
  }
  get streetNumberInput() {
    return $(
      locators.properties.property_address.manual_address_form
        .STREET_NUMBER_INPUT
    );
  }
  get streetNameInput() {
    return $(
      locators.properties.property_address.manual_address_form.STREET_NAME_INPUT
    );
  }
  get streetTypeItems() {
    return $(
      locators.properties.property_address.manual_address_form.STREET_TYPE_ITEMS
    ).getAttribute('items');
  }
  get streetTypeDropdown() {
    return $(
      locators.properties.property_address.manual_address_form
        .STREET_TYPE_DROPDOWN
    );
  }
  get streetTypeList() {
    return $$(
      locators.properties.property_address.manual_address_form.STREET_TYPE_LIST
    );
  }
  get suburbInput() {
    return $(
      locators.properties.property_address.manual_address_form.SUBURB_INPUT
    );
  }
  get stateDropdown() {
    return $(
      locators.properties.property_address.manual_address_form.STATE_DROPDOWN
    );
  }
  get stateList() {
    return $$(
      locators.properties.property_address.manual_address_form.STATE_LIST
    );
  }
  get postcodeInput() {
    return $(
      locators.properties.property_address.manual_address_form.POSTCODE_INPUT
    );
  }
  get saveBtn() {
    return $$(
      locators.properties.property_address.MANUAL_ADDRESS_SAVE_CANCEL_BTNS
    )[0];
  }
  async propertiesManualAddress(testid: string, manualAddress: any) {
    if (!testid || !manualAddress) {
      throw Error(
        `When, testid: ${testid} OR propertyAddress: ${manualAddress} are not valid`
      );
    }
    await this.browserPause(2000);
    await this.click(await this.manualAddressBtn);
    await this.browserPause(2000);
    await this.unitNumberInput.setValue(manualAddress.unitNo);
    await this.streetNumberInput.setValue(manualAddress.streetNo);
    await this.streetNameInput.setValue(manualAddress.streetName);
    await this.click(await this.streetTypeDropdown);
    await this.browserPause(2000);
    //scroll in dropdown and click
    await this.waitForElement(this.streetTypeList[0]);
    const streetTypeArray = (await this.streetTypeItems).split(',');
    const streetTypeIndex = streetTypeArray.indexOf(manualAddress.streetType);
    const stepSize = 10;
    const step = Math.floor(streetTypeIndex / stepSize);
    for (let s = 0; s < step; s++) {
      await this.streetTypeList[stepSize * s].scrollIntoView();
      await this.browserPause(2000);
    }
    await this.click(this.streetTypeList[streetTypeIndex]);
    await this.browserPause(2000);
    await this.suburbInput.setValue(manualAddress.suburb);
    await this.click(await this.stateDropdown);
    await this.browserPause(2000);
    await this.waitForElement(this.stateList[0]);
    await this.loopChildren(
      this.stateList,
      manualAddress.state,
      'manual address: stateList() loop failed'
    );
    await this.browserPause(2000);

    //scroll in dropdown and click
    await this.postcodeInput.setValue(manualAddress.postcode);
    await this.browserPause(2000);

    await this.click(await this.saveBtn);
    await this.browserPause(5000);
  }

  get propertyEstimatedInput() {
    return $(locators.properties.property_about.ESTIMATE_INPUT);
  }

  async propertiesEstimatedValue(
    testid: string,
    propertyEstimatedValue: string
  ) {
    if (!testid || !propertyEstimatedValue) {
      throw Error(
        `When, testid: ${testid} OR propertyEstimatedValue: ${propertyEstimatedValue} are not valid`
      );
    }

    reporter.addStep(
      testid,
      'debug',
      `property estimate: /property/create, propertiesEstimatedValue()`
    );

    await this.waitForElement(await this.propertyEstimatedInput);
    try {
      await this.propertyEstimatedInput.setValue(propertyEstimatedValue);
    } catch (err) {
      err.message = `property estimate: /property/create, propertiesEstimatedValue() failed`;
      throw err;
    }

    reporter.addStep(
      testid,
      'info',
      `property address: /property/create, propertiesEstimatedValue() successful`
    );
    await this.browserPause(2000);
  }

  get ownershipRadioBtn() {
    return $$(locators.properties.property_about.OWNERSHIP);
  }

  async propertiesOwnership(testid: string, propertyOwnership: string) {
    if (!testid || !propertyOwnership) {
      throw Error(
        `When, testid: ${testid} OR propertyOwnership: ${propertyOwnership} are not valid`
      );
    }

    reporter.addStep(
      testid,
      'debug',
      `property ownership: /property/create, propertiesOwnership()`
    );

    await this.waitForElement(await this.ownershipRadioBtn[0]);

    try {
      for (
        let index = 0;
        index < (await this.ownershipRadioBtn.length);
        index++
      ) {
        let element = await this.ownershipRadioBtn[index].getText();
        if (propertyOwnership === element) {
          await this.click(await this.ownershipRadioBtn[index]);
          break;
        }
      }
    } catch (err) {
      err.message = `property ownership: /property/create, propertiesOwnership() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `property ownership: /property/create, propertiesOwnership() successful`
    );

    await this.browserPause(2000);
  }

  get propertyCurrentLoanInput() {
    return $(locators.properties.property_current_loan.CURRENT_INPUT);
  }

  async propertiesOutstandingLoan(
    testid: string,
    propertyOutstandingLoan: string
  ) {
    if (!testid || !propertyOutstandingLoan) {
      throw Error(
        `When, testid: ${testid} OR propertyOutstandingLoan: ${propertyOutstandingLoan} are not valid`
      );
    }

    reporter.addStep(
      testid,
      'debug',
      `property outstanding loan: /property/create, propertiesOutstandingLoan()`
    );

    await this.waitForElement(await this.propertyCurrentLoanInput);

    try {
      await this.propertyCurrentLoanInput.setValue(propertyOutstandingLoan);
    } catch (err) {
      err.message = `property outstanding loan: /property/create, propertiesOutstandingLoan() failed`;
      throw err;
    }
    await this.browserPause(2000);
  }

  get propertyCurrentRateInput() {
    return $(locators.properties.property_current_loan.CURRENT_RATE_INPUT);
  }

  async propertiesCurrentRate(testid: string, propertyCurrentRate: string) {
    if (!testid || !propertyCurrentRate) {
      throw Error(
        `When, testid: ${testid} OR propertiesCurrentRate: ${propertyCurrentRate} are not valid`
      );
    }

    reporter.addStep(
      testid,
      'debug',
      `property current loan: /property/create, propertiesCurrentRate()`
    );
    try {
      await this.waitForElement(await this.propertyCurrentRateInput);
      await this.propertyCurrentRateInput.setValue(propertyCurrentRate);
    } catch (err) {
      err.message = `property current loan: /property/create, propertiesCurrentRate() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `property outstanding loan: /property/create, propertiesCurrentRate() successful`
    );

    await this.browserPause(2000);
  }

  get propertyTypeDropdown() {
    return $$('ul.vs__dropdown-menu .vs__dropdown-option');
  }

  async propertiesType(testid: string, type: string) {
    if (!testid || !type) {
      throw Error(`When, testid: ${testid} OR type: ${type} are not valid`);
    }

    reporter.addStep(
      testid,
      'debug',
      `property current loan: /property/create, propertiesCurrentRate()`
    );
    await this.waitForElement(this.propertyTypeDropdown[0]);
    try {
      await this.loopChildren(
        await this.propertyTypeDropdown,
        type,
        `property current loan: /property/create, propertiesCurrentRate() failed`
      );
    } catch (err) {
      err.message = `property current loan: /property/create, propertiesCurrentRate() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `property outstanding loan: /property/create, propertiesCurrentRate() successful`
    );

    await this.browserPause(2000);
  }
}

export default new PropertiesPage();
