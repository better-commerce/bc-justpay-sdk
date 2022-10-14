// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { stringFormat } from "../utils/format-util";

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
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);
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
    static creditDebitCardPayment(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(`${Endpoints.Payment.TRANSACTIONS}#CardTransaction`, params, RequestMethod.POST, requestOptions, false);
                response = Payment.updatePaymentResponseStructure(response);
                resolve(new Payment(response));
            } catch (error) {
                reject(error);
            }
        });
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
    static netbankingPayment(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(`${Endpoints.Payment.TRANSACTIONS}#netbanking`, params, RequestMethod.POST, requestOptions, false);
                response = Payment.updatePaymentResponseStructure(response);
                resolve(new Payment(response));
            } catch (error) {
                reject(error);
            }
        });
    }

    static walletPayment(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(`${Endpoints.Payment.TRANSACTIONS}#WalletPayment`, params, RequestMethod.POST, requestOptions, false);
                response = Payment.updatePaymentResponseStructure(response);
                resolve(new Payment(response));
            } catch (error) {
                reject(error);
            }
        });
    }

    static upiIntentPayment(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        params.format = "json";
        return new Promise(async (resolve, reject) => {
            try {
                let response: any = await this.apiCall(`${Endpoints.Payment.TRANSACTIONS}#UPIPay`, params, RequestMethod.POST, requestOptions, false);
                //response = Payment.updatePaymentResponseStructure(response);
                if (response?.payment?.sdk_params) {
                    const sdk_params = response?.payment?.sdk_params;
                    const urlFormat = "upi://pay?tr={tr}&tid={tid}&pa={pa}&mc={mcc}&pn={pn}&am={am}&cu={cu}&tn={tn}";
                    const upiIntentUrl = stringFormat(urlFormat, {
                        tr: sdk_params?.tr,
                        tid: response?.txn_id,
                        pa: sdk_params?.merchant_vpa,
                        mcc: sdk_params?.mcc,
                        pn: sdk_params?.merchant_name,
                        am: sdk_params?.mam,
                        cu: sdk_params?.currency,
                        tn: sdk_params?.tn
                    })
                    response = { ...response, ...{ upiIntentUrl: upiIntentUrl } };
                }
                resolve(response);
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
        let authResp = response.payment.authentication;
        response.method = authResp.method;
        response.url = authResp.url;

        if (response.method == "POST") {
            response.params = Array();

            for (let key of Object.values(Object.keys(authResp.params))) {
                response.params[key] = authResp.params[key];
            }
        }

        delete response.payment;
        return response;
    }

};

