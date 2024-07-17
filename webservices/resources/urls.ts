import { Constants } from '../../webservicesExport';

const environment = Constants.commandLineArguments.env;

/**
 * BaseUrl's for different environments(Eg: DEV, QA)
 * @returns
 */
function getBaseUrl() {
  switch (environment) {
    case 'qa': return 'https://reqres.in';
    case 'dev': return 'https://reqres.in';
    default: return '';
  }
}

export module Urls {
  export const baseUrl: string = getBaseUrl();

  export const TestUrls = {
    getAllUsers: `${baseUrl}/api/users?page=PAGENO`,
    getSpecificUserData: `${baseUrl}/api/users/ID`,
    createUser: `${baseUrl}/api/users`,
    loginUser: `${baseUrl}/api/login`,
  };

}
