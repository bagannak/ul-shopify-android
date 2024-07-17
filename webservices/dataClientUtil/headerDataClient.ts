export module HeaderDataClient {

  export async function getHeadersContentType(): Promise<{}> {
    const headers: any = {
      'content-type': 'application/json',
    };
    return headers;
  }

  export async function getHeadersAuthorization(token?:string): Promise<{}> {
    const headers: any = {
      'content-type': 'application/json',
      authorization: token,
    };
    return headers;
  }
}
