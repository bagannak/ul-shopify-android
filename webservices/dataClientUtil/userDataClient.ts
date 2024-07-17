import path from 'path';
import {
  JsonReaderHelper, CreateUserReq, UserData, Constants, UserLoginData,
} from '../../webservicesExport';
import { LoginUserReq } from '../models/request/user/loginUserReq';

const createUserJson = path.join(Constants.dataFolderPath, '/jsonRequests/user/createUser.json');
const loginUserJson = path.join(Constants.dataFolderPath, '/jsonRequests/user/loginUser.json');

export module UserDataClient {

  export async function createUserDataRequest(userData:UserData): Promise<CreateUserReq> {
    const request = JsonReaderHelper.readAttribute('$', createUserJson) as CreateUserReq;
    request.name = userData.name;
    request.job = userData.job;
    return request;
  }

  export async function loginUserDataRequest(userLoginData:UserLoginData): Promise<LoginUserReq> {
    const request = JsonReaderHelper.readAttribute('$', loginUserJson) as LoginUserReq;
    request.email = userLoginData.email;
    request.password = userLoginData.password;
    return request;
  }
}
