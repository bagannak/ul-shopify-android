#!/usr/bin/env bash
echo '------------Set up node version with nvm---------------'
source ~/.nvm/nvm.sh
nvm install v14.15.5
nvm use
node --version

echo '------------npm install---------------'
#rm -rf node_modules
npm run install-dependency

echo '------------Generate allure-report folder---------------'
npm run generate-report

echo '------------Moving allure results folder inside allure-report folder---------------'
mv "allure-results" "allure-report"