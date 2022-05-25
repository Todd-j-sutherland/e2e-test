import { config as baseConfig } from '../../../wdio.conf';
export const config = Object.assign(baseConfig, {
  environment: 'Dev',
  ob_baseURL: 'https://dev-apply.verteva.com.au',
  larry: 'https://larry-dev.herokuapp.com',
  sf: 'https://verteva--dev.my.salesforce.com',
  con_baseURL: 'https://wilson-sandbox.nano.com.au',
  logLevel: 'warn',
  baseUrl: 'https://dev-apply.verteva.com.au',
});
