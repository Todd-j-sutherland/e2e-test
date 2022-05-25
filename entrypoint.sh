#!/bin/sh -l
# npm install

ls
echo "jeff------------------- $1 -----------------------------"
time=$(date)
echo "::set-output name=time::$time"
npm run test
# npm install
# npm run test