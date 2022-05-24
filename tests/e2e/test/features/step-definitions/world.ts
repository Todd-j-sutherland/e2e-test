import { setWorldConstructor } from '@wdio/cucumber-framework';

class CustomWorld {
  testid: string;
  appid: string;
  log_level: string;
  address: string;
  loan_purpose: string;
  app_type: string;
  repayment: string;
  application_id: string;
  applicant_id: string;
  csrf: string;
  session_id: string;
  emv: string;
  req_loan: string;
  plus1_applicant_id: string;
  existingUser: string;
  scenario_data: object;
  mobile_number: string;
  intent: string;

  constructor() {
    this.intent = '';
    this.mobile_number = '';
    this.existingUser = '';
    this.req_loan = '';
    this.emv = '';
    this.csrf = '';
    this.session_id = '';
    this.applicant_id = '';
    this.application_id = '';
    this.plus1_applicant_id = '';
    this.appid = '';
    this.testid = '';
    this.address = '';
    this.loan_purpose = '';
    this.app_type = '';
    this.repayment = '';
    this.scenario_data = {};
  }
}
setWorldConstructor(CustomWorld);
