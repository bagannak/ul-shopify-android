import { Response } from 'superagent';

export interface RequestResponseHolder {
    request?:string,
    response?:Response,
    resourcePath?:string,
    customDescription?:any
    responseTime?:number,
    schema?:Object,
}
