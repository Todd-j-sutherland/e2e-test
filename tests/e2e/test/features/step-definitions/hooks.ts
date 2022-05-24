//@ts-nocheck
import { BeforeStep, AfterStep, BeforeStep } from '@wdio/cucumber-framework';

AfterStep(function (test) {
  if (test.result.status !== 'PASSED') browser.takeScreenshot();
});

BeforeStep(function (x) {
  this.testid = browser.config.testid;
});
