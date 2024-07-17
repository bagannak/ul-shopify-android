/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
import superagent, { Response } from 'superagent';
import { URLSearchParams } from 'url';
import { LOGGER, RequestResponseHolder } from '../../../webservicesExport';

export enum ReturnResponseAs{'JSON', 'TEXT', 'BUFFER'}

/**
 * this class has all the basic http operations
 */
export class BaseService {
  static async get(resourcePath: string, headersParam: any, queryParam?: {}): Promise<RequestResponseHolder> {
    let response:Response;
    const startTime = new Date().getTime();
    let endTime = new Date().getTime();
    try {
      if (queryParam !== undefined) {
        response = await superagent.get(resourcePath).set(headersParam).query(queryParam);
      } else { response = await superagent.get(resourcePath).set(headersParam); }

      endTime = new Date().getTime();
    } catch (error) {
      LOGGER.error(`get request failed\n${error.message}`);
      // throw new Error(`get request failed\n${error.stack}`);
      response = error.response;
    }
    return {
      request: '', response, resourcePath, responseTime: endTime - startTime,
    };
  }

  static async post(resourcePath: string, bodyParam: any, headersParam: any):Promise<RequestResponseHolder> {
    let response:Response;
    const startTime = new Date().getTime();
    let endTime = new Date().getTime();
    try {
      if (bodyParam instanceof URLSearchParams) {
        response = await superagent.post(resourcePath).set(headersParam).send(bodyParam);
      } else {
        response = await superagent.post(resourcePath).set(headersParam).send(JSON.stringify(bodyParam));
      }
      endTime = new Date().getTime();
    } catch (error) {
      LOGGER.error(`post request failed\n${error.message}`);
      // throw new Error(`post request failed\n${error.stack}`);
      response = error.response;
    }
    return {
      request: bodyParam, response, resourcePath, responseTime: endTime - startTime,
    };
  }

  static async postFile(resourcePath: string, formData: {}, headersParam: any):Promise<RequestResponseHolder> {
    let response:Response;
    const startTime = new Date().getTime();
    let endTime = new Date().getTime();
    try {
      response = await superagent.post(resourcePath).set(headersParam).field(formData);
      endTime = new Date().getTime();
    } catch (error) {
      LOGGER.error(`post request failed\n${error.message}`);
      // throw new Error(`post request failed\n${error.stack}`);
      response = error.response;
    }
    return {
      request: JSON.stringify(formData), response, resourcePath, responseTime: endTime - startTime,
    };
  }

  static async delete(resourcePath: string, bodyParam: any, headersParam: any):Promise<RequestResponseHolder> {
    let response:Response;
    const startTime = new Date().getTime();
    let endTime = new Date().getTime();
    try {
      if (bodyParam instanceof URLSearchParams) {
        await superagent.delete(resourcePath).set(headersParam).send(bodyParam);
        response = await superagent.delete(resourcePath).set(headersParam).send(bodyParam);
        // request = new Request(resourcePath, { method: 'DELETE', body: bodyParam, headers: headersParam });
      } else if (bodyParam === undefined) {
        response = await superagent.delete(resourcePath).set(headersParam);
        // request = new Request(resourcePath, { method: 'DELETE', headers: headersParam });
      } else {
        response = await superagent.delete(resourcePath).set(headersParam).send(JSON.stringify(bodyParam));
        // request = new Request(resourcePath, { method: 'DELETE', body: JSON.stringify(bodyParam), headers: headersParam });
      }
      // const responseDateTime = response.headers.get('date');
      // if (!(responseDateTime === undefined || responseDateTime === '')) endTime = new Date(responseDateTime).getTime();
      endTime = new Date().getTime();
    } catch (error) {
      LOGGER.error(`delete request failed\n${error.message}`);
      // throw new Error(`delete request failed\n${error.stack}`);
      response = error.response;
    }
    return {
      request: bodyParam, response, resourcePath, responseTime: endTime - startTime,
    };
  }

  static async convertResponseTo(response:Response, returnResponseAs?:ReturnResponseAs):Promise<any> {
    try {
      switch (returnResponseAs) {
        case ReturnResponseAs.JSON:
          return response.body;
          // break;
        case ReturnResponseAs.TEXT:
          return response.text;
          // break;
        case ReturnResponseAs.BUFFER:
          return Buffer.from(response.text);
          // break;
        default:
          return response.body;
          // break;
      }
    } catch (error) {
      LOGGER.error(`convert response to ${returnResponseAs} failed\n${error.message}`);
      throw new Error(`convert response to ${returnResponseAs} failed\n${error.stack}`);
    }
  }
}
