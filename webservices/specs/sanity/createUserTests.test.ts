/**
 * @group Sanity
 */

import {
  LOGGER, LoggerHelper, RandomGenerator, RequestResponseHolder, UserData,
  UserLoginData, UserServices, ValidationUtil,
} from '../../../webservicesExport';

const specName = 'Create User Tests';

let requestResponse:RequestResponseHolder;

function skipOrExecuteSpec() {
  return describe;
}

skipOrExecuteSpec()(specName, () => {
  beforeAll(async () => {
    LoggerHelper.setupLogger(specName);
    LOGGER.info('Logger setup completed');
  });

  beforeEach(async () => {
    LOGGER.info('before each called');
  });

  afterEach(async () => {
    LOGGER.info('after each called');
  });

  afterAll(async () => {
    LOGGER.info('after all');
  });

  it('Login and create a new user using Authorization token', async () => {
    // prepare user LoginData
    const email = 'eve.holt@reqres.in';
    const password = 'cityslicka';
    const userLoginData: UserLoginData = {
      email, password,
    };

    // Login to App and get authorization token
    requestResponse = await UserServices.loginUser(userLoginData);
    const loginUserResp = await UserServices.readLoginUserResponse(requestResponse);
    await ValidationUtil.responseCode(requestResponse, 200, 'Expected status code-200');
    const authorizationToken = await loginUserResp.token;

    // Create a new user using token
    // prepare new user data
    const name = `User_${await RandomGenerator.getRandomInteger(1000, 100000)}`;
    const job = `Job_${await RandomGenerator.getRandomInteger(1000, 100000)}`;
    const userData:UserData = {
      name, job,
    };

    requestResponse = await UserServices.createUser(userData, authorizationToken);
    const createUserResp = await UserServices.readCreateUserResponse(requestResponse);
    await ValidationUtil.responseCode(requestResponse, 201, 'Expected status code-201');
    await ValidationUtil.verifyValues(requestResponse, userData.name, createUserResp.name, 'created user name mismatch');
    await ValidationUtil.verifyValues(requestResponse, userData.job, createUserResp.job, 'created user job mismatch');
    await ValidationUtil.validateNotNullOrEmpty(requestResponse, createUserResp.id);
  });
});
