import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';

class PersonalDetailsPage extends Page {
  applyContinue: string;
  constructor() {
    super();
  }
  /*       personalDetails            */
  get noMiddleNameCheckbox() {
    return $(
      locators.personal_details.personal_details.NO_MIDDLE_NAME_CHECKBOX
    );
  }
  get dobInput() {
    return $$(locators.personal_details.personal_details.DOB_INPUT);
  }
  get driverLicenseRadioBtns() {
    return $$(locators.personal_details.personal_details.DRIVER_LICENSE);
  }

  get ageError() {
    //@ts-ignore
    return $(locators.personal_details.personal_details.ERROR_AGE);
  }

  async personalDetails(
    testid: string,
    noMiddleName: boolean,
    DOB: any,
    driverLicense: string
  ) {
    if (!testid || !noMiddleName || !DOB || !driverLicense) {
      throw Error(
        `When, testid: ${testid} OR noMiddleName: ${noMiddleName}  OR DOB: ${DOB} OR driverLicense: ${driverLicense} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'info',
      `personal details: profile/applicant-details dob`
    );
    try {
      if (noMiddleName) {
        await this.waitForElement(await this.noMiddleNameCheckbox);
        await this.click(await this.noMiddleNameCheckbox);
      }
      await this.waitForElement(await this.dobInput[0]);
      await this.browserPause(2000);
      for (let index = 0; index < (await this.dobInput.length); index++) {
        let element = await this.dobInput[index];
        await element.setValue(DOB[index]);
      }
    } catch (err) {
      err.message = `profile/applicant-details dob failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `personal details: profile/applicant-details dob successful`
    );
    reporter.addStep(
      testid,
      'info',
      `personal details: profile/applicant-details driverLicenseRadioBtns()`
    );
    await this.loopChildren(
      await this.driverLicenseRadioBtns,
      driverLicense,
      `personal_details: profile/applicant-details driverLicenseRadioBtns() failed`
    );
    reporter.addStep(
      testid,
      'info',
      `personal details: profile/applicant-details driverLicenseRadioBtns() successful`
    );
    await this.browserPause(2000);
  }

  /*       contactDetails           */
  get homeAddressCheckbox() {
    return $(locators.personal_details.contact_details.HOME_ADDRESS_CHECKBOX);
  }
  async contactDetails(testid: string, homeAddress: boolean) {
    if (!testid || !homeAddress) {
      throw Error(
        `When, testid: ${testid} OR homeAddress: ${homeAddress} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'info',
      `contact details: profile/applicant-details homeAddressCheckbox()`
    );
    try {
      if (homeAddress) {
        await this.waitForElement(await this.homeAddressCheckbox);
        await this.click(await this.homeAddressCheckbox);
      }
    } catch (err) {
      err.message = `profile/applicant-details homeAddressCheckbox() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `contact details: profile/applicant-details homeAddressCheckbox() successful`
    );
    await this.browserPause(2000);
  }

  /*       contactDetails           */
  get applyOnRadioBtns() {
    return $$(locators.personal_details.household_finances.APPLY_ON);
  }
  get dependentNumber() {
    return $(locators.personal_details.household_finances.DEPENDENT_NUMBER);
  }
  async householdFinances(
    testid: string,
    applyOn: string,
    dependentNumber: number
  ) {
    if (!testid || !applyOn) {
      throw Error(
        `When, testid: ${testid} OR applyOn: ${applyOn} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'debug',
      `household finances: profile/applicant-details applyOnRadioBtns()`
    );
    await this.waitForElement(await this.applyOnRadioBtns[0]);
    await this.loopChildren(
      await this.applyOnRadioBtns,
      applyOn,
      `household_finances: profile/applicant-details applyOnRadioBtns() failed`
    );
    reporter.addStep(
      testid,
      'info',
      `household finances: profile/applicant-details applyOnRadioBtns() successful`
    );

    await this.waitForElement(await this.dependentNumber);
    await this.dependentNumber.setValue(dependentNumber);
    await this.browserPause(2000);
  }

  /*       taxInformation          */
  get taxResidentCheckbox() {
    return $(locators.personal_details.tax_info.TAX_RESIDENT_CHECKBOX);
  }
  async taxInformation(testid: string, taxResident: boolean) {
    if (!testid || !taxResident) {
      throw Error(
        `When, testid: ${testid} OR taxResident: ${taxResident} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'debug',
      `tax information: profile/applicant-details taxResidentCheckbox()`
    );
    try {
      if (taxResident) {
        await this.click(await this.taxResidentCheckbox);
      }
      await this.browserPause(2000);
    } catch (err) {
      err.message = `profile/applicant-details tax information failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `tax information: profile/applicant-details taxResidentCheckbox() successful`
    );
    await this.browserPause(2000);
  }

  /*       yourEmployment          */
  get employmentRadioBtns() {
    return $$(locators.personal_details.employment.EMPLOYMENT_BTN);
  }
  async yourEmployment(testid: string, employment: string) {
    if (!testid || !employment) {
      throw Error(
        `When, testid: ${testid} OR employment: ${employment} are not valid`
      );
    }
    reporter.addStep(
      testid,
      'debug',
      `tax information: profile/applicant-details employmentRadioBtns()`
    );
    await this.loopChildren(
      this.employmentRadioBtns,
      employment,
      `your_employment: profile/applicant-details employmentRadioBtns() failed`
    );
    reporter.addStep(
      testid,
      'info',
      `tax information: profile/applicant-details employmentRadioBtns() successful`
    );
    await this.browserPause(2000);
  }

  /*       Employment - Fulltime PAYG          */
  get industryInput() {
    return $(locators.personal_details.employment.INDUSTRY_INPUT);
  }
  get industryDropdown() {
    return $$(locators.personal_details.employment.INDUSTRY_DROPDOWN);
  }
  get employerNameInput() {
    return $(locators.personal_details.employment.EMPLOYER_NAME_INPUT);
  }
  get employmentLengthInput() {
    return $(locators.personal_details.employment.EMPLOYMENT_LENGTH_INPUT);
  }
  get employmentLengthDropdown() {
    return $$(locators.personal_details.employment.EMPLOYMENT_LENGTH_DROPDOWN);
  }
  async fulltimePAYG(testid: string) {
    await this.click(await this.industryInput);
    await this.browserPause(2000);
    await this.loopChildren(
      this.industryDropdown,
      'Mining',
      'employment: industryDropdown() failed'
    );
    await this.browserPause(2000);
    await this.employerNameInput.setValue('Employer Pty Ltd');
    await this.browserPause(2000);
    await this.click(await this.employmentLengthInput);
    await this.browserPause(2000);
    await this.loopChildren(
      this.employmentLengthDropdown,
      '7-12',
      'employment: employmentLengthDropdown() failed'
    );
    await this.browserPause(2000);
  }

  /*       Income          */
  get baseSalaryInput() {
    return $(locators.personal_details.income.BASE_SALARY_INPUT);
  }
  get includesSuperRadioBtns() {
    return $$(locators.personal_details.income.INCLUDES_SUPER);
  }
  get incomeReducedRadioBtns() {
    return $$(locators.personal_details.income.INCOME_REDUCED);
  }
  get incomeMayChangeRadioBtns() {
    return $$(locators.personal_details.income.INCOME_MAY_CHANGE);
  }
  get carAllowanceRadioBtns() {
    return $$(locators.personal_details.income.CAR_ALLOWANCE);
  }
  async yourIncome(
    testid: string,
    incomeReduce: string,
    incomeChange: string,
    carAllowance: string
  ) {
    await this.baseSalaryInput.setValue(200000);
    await this.browserPause(2000);
    await this.loopChildren(
      this.includesSuperRadioBtns,
      'Includes Super',
      'income: includesSuperRadioBtns() failed'
    );
    await this.browserPause(2000);
    await this.loopChildren(
      this.incomeReducedRadioBtns,
      incomeReduce,
      'income: incomeReducedRadioBtns() failed'
    );
    await this.browserPause(2000);
    await this.loopChildren(
      this.incomeMayChangeRadioBtns,
      incomeChange,
      'income: incomeMayChangeRadioBtns() failed'
    );
    await this.browserPause(2000);
    await this.loopChildren(
      this.carAllowanceRadioBtns,
      carAllowance,
      'income: carAllowanceRadioBtns() failed'
    );
    await this.browserPause(2000);
  }

  async invalidAge(testid: string) {
    if (!testid) {
      throw Error(`When, testid: ${testid} is not valid`);
    }
    reporter.addStep(
      testid,
      'debug',
      `personal details: profile/applicant-details Age Check()`
    );
    try {
      await this.browserPause(2000);
      let elem = await this.ageError;
      await chai.expect(await elem.isDisplayed()).to.eq(true);
    } catch (err) {
      err.message = `personal details: profile/applicant-details Age Check() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `contact details: personal details: profile/applicant-details Age Error Check() successful`
    );
    await this.browserPause(2000);
  }

  get plusOneNumberInput() {
    return $(
      "//span[contains(@label,'mobile number')]//div[contains(@class, 'input-tel input-phone-number')]//input"
    );
  }
  get plusOneEmailInput() {
    return $("//div[contains(@label,'email')]//input");
  }
  get plusOneFirstNameInput() {
    return $("//div[contains(@label,'first name')]//input");
  }
  get plusOneLastNameInput() {
    return $("//div[contains(@label,'last name')]//input");
  }

  async jointAppContactDetails(testid: string, data: any) {
    if (!testid) {
      throw Error(`When, testid: ${testid} is not valid`);
    }

    const jointDetails = data.personal_details.joint_app.contact_details;
    console.log(jointDetails);
    reporter.addStep(
      testid,
      'debug',
      `personal details: profile/joint-applicant-details jointAppContact()`
    );
    try {
      await this.browserPause(2000);
      await this.typeInto(await this.plusOneNumberInput, jointDetails.number);
      await this.typeInto(await this.plusOneEmailInput, jointDetails.email);
      await this.typeInto(
        await this.plusOneFirstNameInput,
        jointDetails.first_name
      );
      await this.typeInto(
        await this.plusOneLastNameInput,
        jointDetails.last_name
      );
    } catch (err) {
      err.message = `personal details: profile/joint-applicant-details jointAppContact() failed`;
      throw err;
    }
    reporter.addStep(
      testid,
      'info',
      `contact details: personal details: profile/applicant-details join applicany Check() successful`
    );
    await this.browserPause(2000);
  }
}

export default new PersonalDetailsPage();
