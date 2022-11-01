// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { consoleLog } from "../utils/log-util";

export class Offers extends BaseEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);

            if (newKey == "dateCreated" || newKey == "lastUpdated") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
        consoleLog(this);
    }

    static list(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(Endpoints.Offers.LIST, params, RequestMethod.POST, requestOptions, true, {
                    'Content-Type': 'application/json',
                }, false);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });

    }
}