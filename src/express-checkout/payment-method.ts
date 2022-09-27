import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";
import { stringFormat } from "../utils/format-util";

/**
 * Class PaymentMethod
 *
 * @property string paymentMethod
 * @property string paymentMethodType
 * @property string description
 *
 */
export class PaymentMethod extends BaseEntity {

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
     * @param string merchantId
     * @param RequestOptions|null requestOptions
     *
     * @return PaymentMethodList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(merchantId: string, requestOptions = undefined) {
        if (merchantId == undefined || merchantId == "") {
            throw new InvalidRequestException();
        }

        const url = stringFormat(Endpoints.PaymentMethods.LIST, { merchantId: merchantId });
        var response: any = this.apiCall(url, undefined, RequestMethod.GET, requestOptions);
        var paymentMethods = Array();

        if ("payment_methods" in response) {
            paymentMethods = response.payment_methods;

            for (var i = 0; i < paymentMethods.length; i++) {
                paymentMethods[i] = new PaymentMethod(paymentMethods[i]);
            }
        }

        return paymentMethods;
    }

};

