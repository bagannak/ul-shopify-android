/**
 * @group Sanity
 */

import {
  LOGGER, LoggerHelper, RequestResponseHolder,
  UserServices, ValidationUtil,
} from '../../../webservicesExport';

const specName = 'Get User details Tests';

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

  it('Verify get specific user', async () => {
    const userID = 2;
    requestResponse = await UserServices.getSpecificUser(userID);
    const getSpecificUserDataResp = await UserServices.readGetSpecificUserResponse(requestResponse);
    LOGGER.info(JSON.stringify(getSpecificUserDataResp));
    await ValidationUtil.responseCode(requestResponse, 200, 'Expected status code-200');
    await ValidationUtil.verifyValues(requestResponse, userID, getSpecificUserDataResp.data.id, 'get specific user failed');
    await ValidationUtil.validateNotNullOrEmpty(requestResponse, getSpecificUserDataResp.data.email);
  });
});
