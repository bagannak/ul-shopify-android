## Description

**_This project contains UI & API Automation for individual APIs & E2E flows for UI & API._**

   - TypeScript(Javascript) is used as the programming language.
   - WebdriverIO & Appium library for UI automation.
   - Super-agent library for API automation.
   - Chai library is used for assertions.
   - Allure-Reports for creating reports.
   - Jest for test execution.

## Read about
   * [**Installation**](#markdown-header-installation)
   * [**Executing tests from pipeline**](#markdown-header-executing-tests-from-pipeline)
   * [**Viewing report from bitbucket pipeline execution**](#markdown-header-viewing-report-from-bitbucket-pipeline-execution)
   * [**API Execution**](#markdown-header-api-execution)
   * [**UI Execution**](#markdown-header-ui-execution)
   * [**Getting started with Api Automation**](#markdown-header-getting-started-with-api-automation)
   * [**Getting started with UI Automation**](#markdown-header-getting-started-with-ui-automation)
   * [**Getting started with APP Automation**](#markdown-header-getting-started-with-app-automation)
   * [**Git commands**](#markdown-header-git-commands)
   * [**Things to be noted before pushing the changes**](#markdown-header-things-to-be-noted-before-pushing-the-changes)
   * [**Coding guidlines**](#markdown-header-coding-guidlines)

## Installation

1. Download and install NodeJs(https://nodejs.org/en/download/)
2. Download and install Java
3. Install allure-commandline globally, run command `npm install -g allure-commandline`
4. Install VS Code
5. Download/Clone the repo to your system.
6. Open the repo in VS code and open terminal
7. run `npm run install-dependency` -- this will install the dependencies and `node_modules` folder will be created
8. Download and install Appium(For Mobile app automation)
9. Download and install Android-studio(For Mobile app automation)
10. The framework is setup completed on your system. Happy automation :)

## Executing tests from pipeline

1. Navigate to `Pipelines` under repo
2. Click on `Run pipeline`
3. Select branch name, better to select `main` branch as it will be have stable code
4. Choose type of test you would like to run `run-api` or `run-ui`
5. Select Env
6. Select Group(Sanity-For P0 flows, All-For P0, P1, P2 flows OR Select respective POD, only POD related cases will be executed)
7. Select Platform(web-Execute tests on chrome browser, lambdatestApp-Execute tests on mobile app)
8. Select Browser(Execute tests on chrome, firefox browser)
8. appCloudUrl - If we select Platform=lambdatestApp then we need to pass appCloudUrl, upload the app on the Lambdatest site and get the app url
9. Run the tests and wait for the completion and follow the steps for viewing report

## Viewing report from bitbucket pipeline execution
Note: We need to install few things, Refer installation point 1, 2 and 3

1. Open `#qa-automation-reports` channel and Click on the `Click Here To View Report` button for particular run OR directly go to pipeline section under bitbucket and choose the specific run
2. Click on `Report` section under Pipeline
3. Select `Artifacts`, Download `allure-report` folder, Extract the folder
4. Open the Terminal change directory to the extracted folder and run the command
   `allure serve` HTML report will be opened

## API Execution
1. If you are on Windows machine please launch the terminal as `bash` (By default windows terminal will be powershell, change to bash refer- https://www.shanebart.com/set-default-vscode-terminal/)
2. Update `config->env.properties.ts` file with proper values
3. Execute `npm run compile` before running any tests or after making any changes in the source code. `dist` folder will be created after this in root directory.
4. Update `test-local` script in the `package.json` file with the respective test case file relative path
   Ex: "test-local": "jest webservices/specs/sanity/individualApi/kycUserActionSummary.test.ts --maxWorkers=2 --forceExit",
5. Command is: `npm run test-local` run this command to execute test cases.
6. Command to execute all the Sanity cases is: `Group=Sanity npm run test-api`
7. Execute `npm run generate-report-open` for opening the allure reports in the local system.

## UI Execution
1. Executing on Chrome browser
    - If you are on Windows machine please launch the terminal as `bash` (By default windows terminal will be powershell, change to bash refer- https://www.shanebart.com/set-default-vscode-terminal/)
    - Run the cmd `npm run webdriver-start` to start the server
    - Update `config->env.properties.ts` file with proper values
    - Execute `npm run compile` before running any tests or after making any changes in the source code. `dist` folder will be created after this in root directory.
    - Update `test-local` variable in the `package.json` file with the respective test case file relative path
      Ex: "test-local": "jest webservices/specs/sanity/individualApi/kycUserActionSummary.test.ts --maxWorkers=2 --forceExit"
    - Command to execute single test on WEB UI : `npm run test-local`
    - Command to execute Sanity tests on WEB UI : `Group=Sanity npm run test-ui`
    - Run the cmd `npm run webdriver-stop` to stop the server

## Getting started with Api Automation

1. Approach to automate API tests
    - Create Request and Response POJO classes in models folder.
    - Create a Data Client that will pass the data for headers and request body to the service file.
    - Create a Service file that will constitute the functions we will execute on the API, creating the request and hitting the API is done here.
    - Finally create a Spec file that will have the test cases for that API.
2. Folder structure as below:
    - We need to work on `webservices` folder:
          1. `models` folder - Has `Request` and `Response` folder, add the POJOs for requests body under `Request` folder under the respective module, and add the Response POJOs under the `Response` folder.
          2. `dataClientUtil` folder - Has the data clients for respective APIs. Create the request body and headers in this folder for respective API.
          3. `serviceutil` folder contains the service files, create the methods for API in this folder.
          4. `specs` folder has the test cases divided under regression and sanity for individual APIs, currently we need to add test cases under `sanity` folder —> `individualApi` folder.
          5. `resources` folder has `url.ts` file where we need to add the API endpoint for respective API.
    - To understand the flow of framework and things to remember before merging changes.
          1. Configs —> basicConfig.ts contains the user data that we are passing in the request. (ONLY change this file if needed, may affect other test cases)
          2. Webservices —> Resources —> testData —> qa —> jsonrequests folder contains the request body of the APIs.
          3. Webservices —> Resources —> testData —> qa —> schemas folder contains the json schema of the response body, this is used to verify if the json body coming in the response is valid or not or if it has been updated.
          4. utils —> services -> validationUtil.ts file contains the methods to assert/validate the response code and body, used in spec layer while creating test cases.
          5. Webservices —> package.json contains the scripts and dependencies for the project.
          6. webservicesExport.ts contains all the functions that are going to be imported by other files

## Getting started with UI Automation

1. Approach to automate UI tests
    - We are using POM(Page object model) approach
    - Create Pages classes for respective features under Pages
    - Create common functions under userActions
    - Finally create a Spec file that will have the test cases which uses userActions.
2. Folder structure as below:
    - We need to work on `ui` folder:
          1. `pages` folder - Declare all the pages classes related to feature.
          2. `pages->userActions` folder - Declare all the user related operations/actions example createParty, createContract etc...
          3. `resources` folder - contatins data files, apk`s etc...
          4. `specs` folder - Test cases divided under regression and sanity, we need to add P0 test cases under `sanity` folder. P1, P2 test cases under regression folder.

## Getting started with APP Automation

1. Approach to automate App UI tests:
    - If app is hybrid app, whole app loads as webview, whatever tests we automate on Desktop chrome most of them will be reused
    - We need to take care of bit of native views when running tests on mobile

2. Pre-requisite:
    - Install Appium desktop
    - Install Android studio
    - Setup Emulator(Pixel 4 with Api level 33 and Playstore enabled symbol)
    - Download the sample android app from https://github.com/testvagrant/Ekam-Template/releases/download/androidapp/sample_app.apk
    - Setup environment variables as below, these are for Mac system, for Windows try to explore and set the variables accrodingly
       - Open terminal and execute cmd `vi ~/.zshrc`, then add below environment details
       - `export ANDROID_HOME=/Users/<REPLACE_THIS>/Library/Android/sdk`
       - `export ANDROID_SDK_ROOT=/Users/<REPLACE_THIS>/Library/Android/sdk`
       - `export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:${PATH}`

3. Few usefull commands:
    - To list devices `adb devices`
    - To stop adb server `adb start-server`
    - To start adb server `adb stop-server`
    - To list available emulators `emulator -list-avds`
    - To start emulator from cmd line `emulator -avd Pixel_4_API_33`
    - Get currently launched app package and activity
       - On Mac `adb shell dumpsys window | grep -E 'mCurrentFocus'`
       - On Windows `adb shell dumpsys window | find "mCurrentFocus"`

4. Executing on Mobile Emulator/Device:
    - Start appium desktop server, Start emulator
    - Specify the "APK Name" in basicConfig.ts file for specific environment `"apkName": "sample_app.apk"`
    - Specify the "Android Device Name" in local.configs.ts file under the section "capabilities" `appium:deviceName`: `Pixel4`
    - Update `config->env.properties.ts` file with proper values
    - Execute command `npm run compile`, update test-local suite file path
    - Command to execute tests on local Emulator/Device : `npm run test-local`

5. Executing on Lambdatest Mobile Device:
    - Upload app on to the Lambdatest portal https://applive.lambdatest.com/app
    - Select uploaded app and click on three dot's, Click on "Copy App ID"
    - Paste the "App ID" in basicConfig.ts file for specific environment `"appCloudUrl": 'lt://APP10160202521674891381067994'`
    - Update `config->env.properties.ts` file with proper values
    - Execute command `npm run compile`, update test-local suite file path
    - Command to execute tests on Lambdatest Mobile : `npm run test-local`
    - Command to execute Sanity tests on App : `Group=Sanity npm run test-ui`
    - Executing tests on Mobile app will take more time, better to run app tests from pipeline job and also run tests by selecting specific pod, do not select Sanity or All

## Git commands

1. Create folder and open terminal and cd to new folder
2. Execute `git init` to intialize the git
3. Execute `git remote add origin git@bitbucket.org:63idealabs/nc-test-automation.git` to add remote url
4. `git fetch` to fetch all the remote branch details
5. `git checkout BRANCH_NAME` checkout specific branch
6. `git checkout -b NEW_BRANCH_NAME` to create new branch locally
7. `git pull` to pull content from same origin branch
8. `git pull origin DIFFERENT_BRANCH` to pull content from different remote branch
9. `git merge origin/DIFFERENT_BRANCH` if pull doesn't work, then use merge to pull content from different remote branch
10. `git push` to push local content to remote
11. `git checkout -b newBranchName` to create new branch locally(Note: first checkout particular branch from which you would like create new branch)
12. `git push -u origin arun-qa` to push local branch to remote repository

## Things to be noted before pushing the changes

1. Stage/Add necessary files, do not add package.json file and notifications folder while making a commit
2. Before making a commit, run `npm run compile` to see if for errors in code
3. Run `npm run eslint-fix`, fix errors reported by eslint
4. Commit to your branch(eg. feature1) local and then pull changes from develop/develop-qa branch `git pull origin develop` see for any merge conflicts
5. Then push to your branch(eg. feature1) and then create a PR from your branch to `develop` OR `develop-qa` branch. Do not create a PR from your branch to `main/master` branch
   refer image `Code_Merge_Strategy.png` under the repo

## Coding guidlines

1. Use Camel casing for all the Folder, file names, variables etc...(Ex: newFolder, newFile.ts)
2. Use Pascal casing for all the Classes, Interfaces (Ex: HomePage, SampleInterface)
3. Provide meaning full name and comments to methods
4. Make methods modular and generic
5. DO NOT use Prettier or any plugin to format the code
