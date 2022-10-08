// Model Imports
import { InvalidRequestException } from "../models";

// Other Imports
import { BaseEntity } from "../models/base/base-entity";
import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";

export class UPI extends BaseEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);
            this[newKey] = params[key];
        }
    }

    static verifyVPA(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        let response = this.apiCall(Endpoints.UPI.VERIFY_VPA, params, RequestMethod.POST, requestOptions);
        return response;
    }

    static collect(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        const url = `${Endpoints.Payment.TRANSACTIONS}`;
        let response = this.apiCall(url, params, RequestMethod.POST, requestOptions);
        return response;
    }
}