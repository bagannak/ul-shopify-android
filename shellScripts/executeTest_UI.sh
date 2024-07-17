#!/usr/bin/env bash
echo '------------Set up node version with nvm---------------'
source ~/.nvm/nvm.sh
nvm install v14.15.5
nvm use
node --version

echo '------------npm install---------------'
#rm -rf node_modules
npm run install-dependency

echo '------------Compile code---------------'
npm run compile

# Sending artifacts directly from pipeline
#echo '------------Prepare artifact url to send via discord message---------------'
#echo "${BUILD_URL}"> notifications/allureReportLink.txt
#cat notifications/allureReportLink.txt

echo "------------Execute tests on Env-${Env} Group-${Group} Platform-${Platform} AppUrl-${AppUrl} Headless-${Headless} SendNotification=${SendNotification}---------------"

platform="${Platform}"
lambdatest="lambdatest"

if [[ $platform == *"lambdatest"* ]]
then
    echo "executing test-lambdatest from package.json"
    Group="${Group}" Env="${Env}" Platform="${Platform}" AppUrl="${AppUrl}" Headless="${Headless}" SendNotification="${SendNotification}" npm run test-lambdatest
else
    npm run test-local
fi

# echo '------------Generate allure-report folder---------------'
# npm run generate-report

# echo '------------Moving allure results folder inside allure-report folder---------------'
# mv "allure-results" "allure-report"