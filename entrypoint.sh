#!/bin/sh -l
# npm install
echo "jeff------------------- $1 -----------------------------"
time=$(date)
echo "::set-output name=time::$time"

npx wdio
# npm install