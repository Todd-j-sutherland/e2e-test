import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';
import locators from '../../data/onboarding_fe/locators.json';

class FinancesPage extends Page {
  constructor() {
    super();
  }

  get bankInput() {
    return $(locators.finances.add_bank.BANK_INPUT);
  }
  get bankSelectionDropdown() {
    return $$(locators.finances.add_bank.BANK_DROPDOWN);
  }
  get userNameInput() {
    return $(locators.finances.add_bank.BANK_USERNAME_INPUT);
  }
  get passwordInput() {
    return $(locators.finances.add_bank.BANK_PASSWORD_INPUT);
  }
  get bankSubmit() {
    return $(locators.finances.add_bank.BANK_SUBMIT_BTN);
  }

  async bankSelection(testid: string, bankName: string) {
    if (!testid || !bankName) {
      throw Error(
        `When, testid: ${testid} OR bank name: ${bankName} are not valid`
      );
    }

    try {
      reporter.addStep(
        testid,
        'debug',
        `add bank: /property/financial/add-bank, bankSelection()`
      );
      await this.waitForElement(await this.bankInput);
      await this.typeInto(await this.bankInput, 'Bank of Statements');

      await this.browserPause(2000);
      for (
        let index = 0;
        index < (await this.bankSelectionDropdown.length);
        index++
      ) {
        let element = await this.bankSelectionDropdown[index].getText();

        if (element == 'Bank of Statements') {
          await this.click(await this.bankSelectionDropdown[index]);
          break;
        }
      }
      await this.browserPause(1000);
      await this.waitForElement(await this.userNameInput);
      await this.typeInto(await this.userNameInput, '12345678');
      await this.typeInto(await this.passwordInput, 'TestMyMoney');
      await this.click(await this.bankSubmit);
      await this.browserPause(5000);
      reporter.addStep(
        testid,
        'info',
        `add bank: /property/financial/add-bank, bankSelection() successful`
      );
    } catch (err) {
      err.message = `bank name is not available`;
      throw err;
    }
  }

  get loanSelectionBtn() {
    return $$(locators.finances.loans_liabilities.SELECTION_BTN);
  }
  get loanAddBtn() {
    return $('.c-add-more-button button');
  }

  get loanSelectionDropdown() {
    return $(locators.finances.loans_liabilities.SELECTION_DROPDOWN);
  }
  get loanBankList() {
    return $$(locators.finances.loans_liabilities.BANK_LIST);
  }

  get loanBankBalance() {
    return $(locators.finances.loans_liabilities.BANK_BALANCE_INPUT);
  }

  get loanCreditLimit() {
    return $(locators.finances.loans_liabilities.CREDIT_LIMIT_INPUT);
  }

  get loanSubmitBtn() {
    return $(locators.finances.loans_liabilities.BANK_SUBMIT_BTN);
  }

  get saveBtn() {
    return $(locators.finances.loans_liabilities.LIABILITY_SAVE_BTN);
  }

  get loanAccountSelected() {
    return $$(locators.finances.loans_liabilities.LOAN_ACCOUNT_SELECTED);
  }

  async loanSelection(testid) {
    if (!testid) {
      throw Error(`When, testid: ${testid}`);
    }
    reporter.addStep(
      testid,
      'debug',
      `loans add loan: /property/create, loanSelection()`
    );
    try {
      await this.browserPause(2000);

      await this.waitForElement(await this.loanSelectionBtn[0]);
      await this.click(await this.loanSelectionBtn[0]);
      await this.browserPause(2000);
      await this.waitForElement(await this.loanSelectionBtn[0]);
      await this.click(await this.loanSelectionBtn[0]);

      await this.waitForElement(await this.loanSelectionBtn[0]);
      await this.click(await this.loanSelectionDropdown);
      await this.browserPause(2000);

      await this.waitForElement(await this.loanBankList[0]);
      for (let index = 0; index < (await this.loanBankList.length); index++) {
        let element = await this.loanBankList[index];
        if (await element.isDisplayed()) {
          await this.click(await this.loanBankList[index]);
          break;
        }
      }

      await this.typeInto(await this.loanBankBalance, '500000');
      await this.typeInto(await this.loanCreditLimit, '900000');

      await this.click(await this.loanSubmitBtn);
      await this.browserPause(2000);
      await this.click(await this.loanAccountSelected[0]);

      await this.click(await this.saveBtn);
      reporter.addStep(
        testid,
        'info',
        `loans add loan: /property/create, loanSelection() successful`
      );
    } catch (err) {
      err.message = `loan selection is not there`;
      throw err;
    }
  }

  async additionalLoanSelection(testid) {
    if (!testid) {
      throw Error(`When, testid: ${testid}`);
    }
    reporter.addStep(
      testid,
      'debug',
      `loans add loan: /property/create, loanSelection()`
    );
    try {
      await this.browserPause(2000);

      await this.waitForElement(await this.loanSelectionBtn[0]);
      await this.click(await this.loanSelectionBtn[0]);
      await this.browserPause(2000);
      await this.waitForElement(await this.loanAddBtn);
      await this.click(await this.loanAddBtn);

      await this.waitForElement(await this.loanSelectionBtn[0]);
      await this.click(await this.loanSelectionDropdown);
      await this.browserPause(2000);

      await this.waitForElement(await this.loanBankList[0]);
      for (let index = 0; index < (await this.loanBankList.length); index++) {
        let element = await this.loanBankList[index];
        if (await element.isDisplayed()) {
          await this.click(await this.loanBankList[index]);
          break;
        }
      }

      await this.typeInto(await this.loanBankBalance, '500000');
      await this.typeInto(await this.loanCreditLimit, '900000');

      await this.click(await this.loanSubmitBtn);
      await this.browserPause(2000);
      // await browser.debug();
      // @ts-ignore
      await this.click(
        await this.loanAccountSelected[
          (await this.loanAccountSelected.length) - 1
        ]
      );

      await this.click(await this.saveBtn);
      reporter.addStep(
        testid,
        'info',
        `loans add loan: /property/create, loanSelection() successful`
      );
    } catch (err) {
      err.message = `loan selection is not there`;
      throw err;
    }
  }

  get addLiabilityBtn() {
    return $("[data-im='add-liabilities-add-more-button'] button");
  }
  get addLiabilitySelectDropdown() {
    return $('.v-input__slot');
  }
  get liabilityList() {
    return $$('.v-list-item .v-list-item__title');
  }
  get addBankNameDropdown() {
    return $(
      "[data-im='add-liabilities-add-liabilities-bank-name'] .v-input__slot"
    );
  }
  get bankList() {
    return $$('.v-menu__content .v-list-item .v-list-item__title');
  }

  get balanceOwingInput() {
    return $('[data-im="add-liabilities-add-liabilities-bank-balance"] input');
  }
  get creditLimitInput() {
    return $(
      '[data-im="add-liabilities-add-liabilities-bank-credit-limit"] input'
    );
  }
  get addLiabilitySubmitBtn() {
    return $(
      '[data-im="add-liabilities-add-liabilities-liability-bank-submit"]'
    );
  }

  async addLiability(testid) {
    try {
      reporter.addStep(
        testid,
        'debug',
        `financial add liability: /financial/add-liabilities, addLiability()`
      );
      await this.browserPause(4000);
      await this.click(await this.addLiabilityBtn);
      await this.click(await this.addLiabilitySelectDropdown);
      await this.waitForElement(this.liabilityList[0]);
      await this.click(this.liabilityList[0]);

      await this.click(await this.addBankNameDropdown);
      await this.waitForElement(await this.bankList[12]);
      await this.click(await this.bankList[12]);

      await this.typeInto(await this.balanceOwingInput, '200');
      await this.typeInto(await this.creditLimitInput, '2000');
      await this.click(await this.addLiabilitySubmitBtn);
      reporter.addStep(
        testid,
        'info',
        `financial add liability: /financial/add-liabilities, addLiability() successful`
      );
    } catch (err) {
      err.message = `addLiability failed`;
      throw err;
    }
  }
  get AddBankButton() {
    return $(locators.finances.add_bank.ADD_BANK_BTN);
  }
  async addOtherBank(testid) {
    try {
      reporter.addStep(
        testid,
        'info',
        `financial add other bank for nano customer: /financial/add-bank, addOtherBank()`
      );
      await this.browserPause(2000);
      await this.click(await this.AddBankButton);

      reporter.addStep(
        testid,
        'info',
        `financial add other bank for nano customer: /financial/add-bank, addOtherBank() successful`
      );
    } catch (err) {
      err.message = `addOtherBank failed`;
      throw err;
    }
  }

  get NanoNeedHelpButton() {
    return $(locators.finances.add_bank.NANO_NEED_HELP_BTN);
  }
  get SidePanelCloseButton() {
    return $(locators.finances.add_bank.SIDE_PANEL_GOT_IT_BTN);
  }
  async needHelp(testid) {
    try {
      reporter.addStep(
        testid,
        'info',
        `financial add other bank for nano customer: /financial/add-bank, NeedHelp + SidePanel`
      );
      await this.browserPause(2000);
      await this.click(await this.NanoNeedHelpButton);
      await this.browserPause(2000);
      await this.click(await this.SidePanelCloseButton);
      reporter.addStep(
        testid,
        'info',
        `financial add other bank for nano customer: /financial/add-bank, NeedHelp + SidePanel successful`
      );
    } catch (err) {
      err.message = `/financial/add-bank, NeedHelp + SidePanel failed`;
      throw err;
    }
  }
}
export default new FinancesPage();
