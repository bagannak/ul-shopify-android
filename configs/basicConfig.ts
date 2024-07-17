import { Credentials } from './credentials';

export const BasicConfig = {
  qa: {
    apkName: 'ul-shopify.apk',
    appCloudUrl: 'bs://b043f4d863699604ac6f924957d3375ae1c9451b',
    url: 'https://ekam.studio/',
    credentials: {
      testUser: Credentials.user1,
    },
  },
  dev: {
    apkName: 'app-twa-trafyn.apk',
    appCloudUrl: '',
    url: 'https://www.flipkart.com/',
    credentials: {
      testUser: Credentials.user1,
    },
  },
};
