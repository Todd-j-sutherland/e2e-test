import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';
class AuthPage extends Page {
  constructor() {
    super();
  }

  get mobileNumberInputField() {
    return $(
      `//*[@data-im="login-phone-input"] //div[contains(@class,'input-tel')] //input | //*[@data-im="sign-in-phone-input"] //div[contains(@class,'input-tel')] //input`
    );
  }

  get existingMobileNumberInputField() {
    return $(locators.existingUserLogin.MobileNumberInput);
  }

  get logInContinueBtn() {
    return $(locators.existingUserLogin.logInContinueBtn);
  }

  get signInContinueBtn() {
    return $(
      `//*[@data-im="login-cta-button"] | //*[@data-im="sign-in-cta-button"]`
    );
  }

  async mobileNumberInput(
    testid: string,
    mobileNumber: string,
    existingUser: boolean
  ) {
    if (!testid || !mobileNumber) {
      throw Error(
        `When, testid: ${testid} OR mobile number: ${mobileNumber} are not valid`
      );
    }
    try {
      reporter.addStep(testid, 'debug', `Login: /sign-in`);
      //@ts-ignore
      if (existingUser == true) {
        await this.waitForElement(this.existingMobileNumberInputField);
        await this.typeInto(
          await this.existingMobileNumberInputField,
          mobileNumber
        );
        await this.click(await this.logInContinueBtn);
      } else {
        await this.waitForElement(this.mobileNumberInputField);
        await this.typeInto(await this.mobileNumberInputField, mobileNumber);
        await this.click(await this.signInContinueBtn);
      }

      reporter.addStep(testid, 'info', `Login: /sign-in successful`);
    } catch (err) {
      err.message = `Login: /sign-in failed`;
      throw err;
    }
  }

  get otpInput() {
    return $$(
      `//*[@data-im="login-otp-otp"] | //*[@data-im="sign-in-otp-otp"]`
    );
  }
  get existingOtpInput() {
    return $$(locators.existingUserLogin.existingOtpInput);
  }

  get existingOtpContinueBtn() {
    return $(locators.existingUserLogin.existingOtpContinueBtn);
  }

  get otpContinueBtn() {
    return $(
      `//*[@data-im="login-otp-continue-button"] | //*[@data-im="sign-in-otp-continue-button"]`
    );
  }

  async OTPInput(testid: string, OTPNumber: string, existingUser: boolean) {
    if (!testid || !OTPNumber) {
      throw Error(
        `When, testid: ${testid} OR OTPNumber: ${OTPNumber} are not valid`
      );
    }
    try {
      reporter.addStep(testid, 'debug', `OTP: /sign-in-otp`);

      await this.browserPause(1000);
      if (existingUser == true) {
        await this.click(this.existingOtpInput[0]);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        //@ts-ignore
        await this.click(await this.existingOtpContinueBtn);
        await this.browserPause(4000);
      } else {
        await this.click(this.otpInput[0]);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await browser.keys(['1']);
        await this.click(await this.otpContinueBtn);
      }

      reporter.addStep(testid, 'info', `OTP: /sign-in-otp successful`);
    } catch (err) {
      err.message = `OTP: /OTP failed`;
      throw err;
    }
  }

  /* temp disabled: for new users
  
    get firstNameInput() {
      return $(`//div[contains(@label,'First name')] //input`);
    }
    get lastNameInput() {
      return $(`//div[contains(@label,'Last name')] //input`);
    }
    get emailInput() {
      return $(`//div[contains(@label,'Email')] //input`);
    }

    async signInForm(
      testid: string,
      userDetails: Array<string>,
      logLevel: string
    ) {
      await this.typeInto(await this.firstNameInput, userDetails[0]);
      await this.typeInto(await this.lastNameInput, userDetails[1]);
      await this.typeInto(await this.emailInput, userDetails[2]);
    }
    */
}
export default new AuthPage();
