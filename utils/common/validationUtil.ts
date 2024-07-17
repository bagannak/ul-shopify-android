/* eslint no-param-reassign: 0 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import { Validator } from 'jsonschema';
import {
  BaseService, JsonReaderHelper, LOGGER, RequestResponseHolder, ReturnResponseAs,
} from '../../webservicesExport';

declare let reporter: any;

/**
 * declare all the reponse validators here
 */
export module ValidationUtil{

    export async function attachReqResDetailsToReport(requestResponse:RequestResponseHolder) {
      try {
        const requestBody = Buffer.from(JSON.stringify(requestResponse.request));
        const responseBody = await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.BUFFER);
        reporter.addAttachment('request.json', requestBody);
        reporter.addAttachment('response.json', responseBody);
        if (requestResponse.schema !== undefined) {
          const schema = Buffer.from(JSON.stringify(requestResponse.schema));
          reporter.addAttachment('schema.json', schema);
        }
        // let requestHeaders='';
        // let headers:Headers=BaseService.request.headers;
        // headers.forEach(( value: string, key: string)=>{
        //   if(!value.includes('Bearer'))
        //   requestHeaders+=`${key}:${value}\n`
        // });
        // reporter.description(`Url:\n${BaseService.request.url}\nHeaders:\n${requestHeaders}`);
        const description = requestResponse.customDescription === undefined
          ? `Url:\n${requestResponse.resourcePath}` : `Url:\n${requestResponse.resourcePath}\n${requestResponse.customDescription}`;
        reporter.description(description);
      } catch (error) {
        LOGGER.warn(`Failed to attach request and response files to report\n${error.message}`);
      }
    }

    export async function responseCode(requestResponse:RequestResponseHolder, expectedStatusCode?:number, errorMessage?:string) {
      try {
        const expStatusCode = expectedStatusCode === undefined ? 200 : expectedStatusCode;
        expect(expStatusCode, `response code did not match expected-${expStatusCode}, actual-${requestResponse.response.status}`).equal(requestResponse.response.status);
      } catch (error) {
        if (errorMessage) LOGGER.info(`${errorMessage}`);
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.error('could not validate response code');
        throw new Error(`could not validate response code\n${error.stack}`);
      }
    }

    export async function responseText(requestResponse:RequestResponseHolder, expectedStatusText:string) {
      try {
        expect(expectedStatusText, `response code did not match expected-${expectedStatusText}, actual-${requestResponse.response.status}`).equal(requestResponse.response.status);
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.info('could not validate response text');
        throw new Error(`could not validate response text\n${error.stack}`);
      }
    }

    export async function isEmpty(requestResponse:RequestResponseHolder, actualResponse : any) {
      try {
        expect(actualResponse, 'The Actual response is not empty').to.be.empty;
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.info('could not validate given expected response');
        throw new Error(`could not validate given response \n${error.stack}`);
      }
    }

    export function jsonObjDeepCompare(jsonObj1:any, jsonObj2:any):boolean {
      if (Object.prototype.toString.call(jsonObj1) === Object.prototype.toString.call(jsonObj2)) {
        if (Object.prototype.toString.call(jsonObj1) === '[object Object]' || Object.prototype.toString.call(jsonObj1) === '[object Array]') {
          if (Object.keys(jsonObj1).length !== Object.keys(jsonObj2).length) {
            return false;
          }
          return (Object.keys(jsonObj1).every((key) => jsonObjDeepCompare(jsonObj1[key], jsonObj2[key])));
        }
        return (jsonObj1 === jsonObj2);
      }
      return false;
    }

    /**
     * Verifies actual text contanins expected string.
     * @param expectedText string to be present in the actual text.
     * @param actualText from the application API's response.
     */
    export async function verifyContainsText(requestResponse:RequestResponseHolder, expectedText:string, actualText:string) {
      try {
        LOGGER.info(`Expected text - ${expectedText}`);
        LOGGER.info(`Actual text - ${actualText}`);
        expect(actualText, `actual text -${actualText} doesn't contain the expected text-${expectedText}`).includes(expectedText);
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.error(`could not validate the given expected text- ${expectedText}`);
        throw new Error(`could not validate the given expected text- ${actualText}`);
      }
    }

    export async function verifyValues(requestResponse:RequestResponseHolder, expected:boolean, actual:boolean, customErrMsg?:string):Promise<any>
    export async function verifyValues(requestResponse:RequestResponseHolder, expected:number, actual:number, customErrMsg?:string):Promise<any>
    export async function verifyValues(requestResponse:RequestResponseHolder, expected:string, actual:string, customErrMsg?:string):Promise<any>
    export async function verifyValues(requestResponse:RequestResponseHolder, expected:[], actual:[], customErrMsg?:string):Promise<any>
    export async function verifyValues(requestResponse:RequestResponseHolder, expected:any, actual:any, customErrMsg:string = ''):Promise<any> {
      try {
        let matched:boolean = false;
        switch (typeof expected) {
          case 'boolean':
            if (expected === actual) matched = true;
            break;
          case 'string':
            if (expected === actual) matched = true;
            break;
          case 'number':
            if (expected === actual) matched = true;
            break;
          case 'object':
            if (Array.isArray(expected)) {
              if (JSON.stringify(expected.sort()) === JSON.stringify(actual.sort())) matched = true;
            } else if (expected === actual) matched = true;
            else {
              matched = false;
            }
            break;
          default:
            if (expected === actual) matched = true;
            break;
        }
        if (!matched) throw new Error(`${customErrMsg}\n values not matching expected-${expected}, actual-${actual}`);
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.error(`${customErrMsg}\n values not matching expected-${expected}, actual-${actual}`);
        throw new Error(`${customErrMsg}\n values not matching expected-${expected}, actual-${actual}`);
      }
    }

    export async function verifyValueIsGreater(requestResponse:RequestResponseHolder, expectedValue:number, actualValue:number) {
      try {
        expect(expectedValue, `expected value -${expectedValue} isn't greater than the actual value-${actualValue}`).greaterThanOrEqual(actualValue);
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.error(`actual value ${actualValue} isn't greater than the expected value ${expectedValue}`);
        throw new Error(`actual value ${actualValue} isn't greater than the expected value ${expectedValue}`);
      }
    }

    export async function verifyValueIsLesser(requestResponse:RequestResponseHolder, expectedValue:number, actualValue:number, bufferTimeMs:number = 0) {
      try {
        actualValue -= bufferTimeMs;
        if (!(actualValue > 0 && actualValue < expectedValue)) throw new Error(`actual value ${actualValue} isn't lesser than the expected value ${expectedValue}`);
      } catch (error) {
        await attachReqResDetailsToReport(requestResponse);
        LOGGER.error(`actual value ${actualValue} isn't lesser than the expected value ${expectedValue}`);
        throw new Error(`actual value ${actualValue} isn't lesser than the expected value ${expectedValue}`);
      }
    }

    /**
     * check json data matches with schema
     * Use site if needed for json to schema convertion
     * @param requestResponse
     * @param schemaObjectOrFilePath
     * @param jsonObjectOrFilePath
     * @returns
     */
    export async function validateSchema(requestResponse:RequestResponseHolder, schemaObjectOrFilePath: any, jsonObjectOrFilePath: any) {
      let schemaObject: Object = {};
      let jsonObject: Object = {};
      let schemaValidationStatus:boolean = false;
      let validationResult;
      try {
        if (typeof schemaObjectOrFilePath === 'string') {
          schemaObject = JSON.parse(readFileSync(schemaObjectOrFilePath, 'utf8'));
        } else schemaObject = schemaObjectOrFilePath;

        if (typeof jsonObjectOrFilePath === 'string') {
          schemaObject = JSON.parse(readFileSync(jsonObjectOrFilePath, 'utf8'));
        } else jsonObject = jsonObjectOrFilePath;

        const validator = new Validator();

        validationResult = validator.validate(jsonObject, schemaObject);
        LOGGER.info(`schema validation status-${validationResult.valid}`);
        schemaValidationStatus = validationResult.valid;
        requestResponse.schema = schemaObject;
      } catch (error) {
        schemaValidationStatus = false;
        LOGGER.error(`could not validate schema code\n${error.stack}`);
        throw new Error(`could not validate schema code\n${error.stack}`);
      }
      await verifyValues(requestResponse, true, schemaValidationStatus, `Schema validation failed\n${validationResult.errors.toString()}`);
      // return schemaValidationStatus;
    }

    /**
     * verifies value whether NULL or Empty
     * @param requestResponse
     * @param jsonPathOrValue
     */
     export async function validateNotNullOrEmpty(requestResponse:RequestResponseHolder, jsonPathOrValue:any) {
       let actualValue = jsonPathOrValue;
       try {
         const responseJson = await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.JSON);
         if (typeof jsonPathOrValue === 'string' && jsonPathOrValue.includes('$')) actualValue = JsonReaderHelper.readAttribute(jsonPathOrValue, responseJson);
         if (actualValue === undefined || actualValue === '' || actualValue === null) throw new Error(`value at jsonPath ${jsonPathOrValue} is NULL or EMPTY`);
       } catch (error) {
         await attachReqResDetailsToReport(requestResponse);
         LOGGER.error(`value at jsonPath ${jsonPathOrValue} is NULL or EMPTY`);
         throw error;
       }
     }

    /**
     * validate value from json path
     * @param requestResponse
     * @param expectedValue
     * @param jsonPath
     */
     export async function validateValueFromJson(requestResponse:RequestResponseHolder, expectedValue:string, jsonPath:string) {
       let actualValue = jsonPath;
       const responseJson = await BaseService.convertResponseTo(requestResponse.response, ReturnResponseAs.JSON);
       actualValue = JsonReaderHelper.readAttribute(jsonPath, responseJson);
       await verifyValues(requestResponse, expectedValue, actualValue);
     }
}
