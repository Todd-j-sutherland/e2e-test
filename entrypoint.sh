#!/bin/sh -l
npm install
echo "jeff------------------- $1 -----------------------------"
time=$(date)
echo "::set-output name=time::$time"
ls
# npx wdio tests/e2e/config/wdio.develop.conf.ts --cucumberOpts.tagExpression='@ob_fe_sanity'
# npm install
npm run test