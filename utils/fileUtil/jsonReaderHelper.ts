import { JSONPath } from 'jsonpath-plus';
import { readFileSync } from 'fs';
import { LOGGER } from '../../webservicesExport';

/**
 * Helps in reading the json files attribute based json path
 */
export module JsonReaderHelper {

  /**
   * get the value from json for particular attribute
   * @param jsonFilePath
   * @param jsonPathExpression
   */
  export function readAttribute(jsonPathExpression: string, jsonFilePath: string): any;
  export function readAttribute(jsonPathExpression: string, jsonObject: {}): any;
  export function readAttribute(jsonPathExpression: string, jsonFilePathOrObject: any): any {
    let value: any;
    try {
      if (jsonFilePathOrObject instanceof Object) value = JSONPath({ path: jsonPathExpression, json: jsonFilePathOrObject });
      else value = JSONPath({ path: jsonPathExpression, json: JSON.parse(readFileSync(jsonFilePathOrObject, 'utf-8')) });
    } catch (error) {
      LOGGER.log(error.stack);
      throw new Error(error);
    }
    if (value.length === 1) return value[0];
    return value;
  }
}
