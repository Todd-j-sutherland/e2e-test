#!/bin/sh -l

echo "Hello------------------- $1 -----------------------------"
time=$(date)
echo "::set-output name=time::$time"

npm run test:e2e
# npm install