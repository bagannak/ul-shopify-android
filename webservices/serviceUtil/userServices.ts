import {
  BaseService, CreateUserResp, GetSpecificUserDataResp, HeaderDataClient,
  LOGGER, LoginUserResp, RequestResponseHolder, ReturnResponseAs, Urls,
  UserData, UserDataClient, UserLoginData,
} from '../../webservicesExport';

export class UserServices extends BaseService {
  /**
   * get specific user service
   * @param userID
   * @returns
   */
  static async getSpecificUser(userID:number): Promise<RequestResponseHolder> {
    try {
      const headers = await HeaderDataClient.getHeadersContentType();
      const path = Urls.TestUrls.getSpecificUserData.replace('ID', userID.toString());
      const requestResponse = await BaseService.get(path, headers);
      return requestResponse;
    } catch (error) {
      LOGGER.error(`getSpecificUser service is failed${error.message}`);
      throw new Error(`getSpecificUser service is failed\n${error.stack}`);
    }
  }

  /**
   * method will return response of the getSpecificUser api
   * @param requestResponse
   * @returns
   */
  static async readGetSpecificUserResponse(requestResponse:RequestResponseHolder): Promise<GetSpecificUserDataResp> {
    try {
      return await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.JSON) as GetSpecificUserDataResp;
    } catch (error) {
      LOGGER.error(`readSpecificUserResponse service is failed${error.message}`);
      throw new Error(`readSpecificUserResponse service is failed\n${error.stack}`);
    }
  }

  /**
   * Service which handles Headers, Body and HTTP method and provides Response
   * @param userData
   * @returns
   */
  static async createUser(userData:UserData, token?: string): Promise<RequestResponseHolder> {
    try {
      const headers = await HeaderDataClient.getHeadersAuthorization(token);
      const path = await Urls.TestUrls.createUser;
      const body = await UserDataClient.createUserDataRequest(userData);
      const requestResponse = await BaseService.post(path, body, headers);
      return requestResponse;
    } catch (error) {
      LOGGER.error(`createUser service is failed${error.message}`);
      throw new Error(`createUser service is failed\n${error.stack}`);
    }
  }

  /**
   * method will return response of the createUser api
   * @param requestResponse
   * @returns
   */
  static async readCreateUserResponse(requestResponse:RequestResponseHolder): Promise<CreateUserResp> {
    try {
      return await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.JSON) as CreateUserResp;
    } catch (error) {
      LOGGER.error(`readCreateUserResponse service is failed${error.message}`);
      throw new Error(`readCreateUserResponse service is failed\n${error.stack}`);
    }
  }

  static async loginUser(userLoginData:UserLoginData): Promise<RequestResponseHolder> {
    try {
      const headers = await HeaderDataClient.getHeadersContentType();
      const path = Urls.TestUrls.loginUser;
      const body = await UserDataClient.loginUserDataRequest(userLoginData);
      const requestResponse = await BaseService.post(path, body, headers);
      return requestResponse;
    } catch (error) {
      LOGGER.error(`loginUser service is failed${error.message}`);
      throw new Error(`loginUser service is failed\n${error.stack}`);
    }
  }

  /**
   * method will return response of the loginUser api
   * @param requestResponse
   * @returns
   */
  static async readLoginUserResponse(requestResponse:RequestResponseHolder): Promise<LoginUserResp> {
    try {
      return await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.JSON) as LoginUserResp;
    } catch (error) {
      LOGGER.error(`readLoginUserResponse service is failed${error.message}`);
      throw new Error(`readLoginUserResponse service is failed\n${error.stack}`);
    }
  }
}
