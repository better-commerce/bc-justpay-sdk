// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { JuspayEnv } from "../models";
import { Endpoints, PaymentSource } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { consoleLog } from "../utils/log-util";
import { stringFormat } from "../utils/format-util";

export class Merchant extends BaseEntity {
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

    static paymentMethods(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.GET_PAYMENT_METHODS) ? PaymentSource.GET_PAYMENT_METHODS : "";
        return new Promise(async (resolve, reject) => {
            try {
                const url = stringFormat(Endpoints.Merchant.PAYMENT_METHODS, { merchantId: JuspayEnv.getMerchantId() });
                let response = await this.apiCall(source, url, params, RequestMethod.GET, requestOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });

    }
}