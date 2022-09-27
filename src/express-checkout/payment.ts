import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";


/**
 * Class Payment
 *
 * @property string orderId
 * @property string txnId
 * @property string status
 * @property string method
 * @property string url
 * @property array params
 *
 */
export class Payment extends BaseEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);
            this[newKey] = params[key];
        }
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Payment
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static create(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve, reject) => {
            try {
                var response = await this.apiCall(Endpoints.Payment.TRANSACTIONS, params, RequestMethod.POST, requestOptions, false);
                response = Payment.updatePaymentResponseStructure(response);
                resolve(new Payment(response));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Restructuring the payment response.
     * Removed unnecessary hierarchy in the response.
     *
     * @param array response
     *
     * @return array
     */
    static updatePaymentResponseStructure(response: any) {
        var authResp = response.payment.authentication;
        response.method = authResp.method;
        response.url = authResp.url;

        if (response.method == "POST") {
            response.params = Array();

            for (var key of Object.values(Object.keys(authResp.params))) {
                response.params[key] = authResp.params[key];
            }
        }

        delete response.payment;
        return response;
    }

};

