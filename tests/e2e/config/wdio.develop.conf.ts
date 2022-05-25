import { config as baseConfig } from "../../../wdio.conf";
// import { config as baseConfig } from '../../../wdio.conf';
export const config = Object.assign(baseConfig, {
  environment: "develop",
  baseUrl: "https://dev-apply.verteva.com.au",
  logLevel: "warn",
});
