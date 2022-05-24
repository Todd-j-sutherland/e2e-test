import { config as baseConfig } from '../../../wdio.conf';
export const config = Object.assign(baseConfig, {
  environment: 'dev',
  baseUrl: 'https://amp.dev-apply.verteva.com.au',
  logLevel: 'warn',
});
