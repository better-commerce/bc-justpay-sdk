// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { Endpoints, PaymentSource } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { Card } from "./card";
import { OrderList } from "./order-list";
import { PaymentGatewayResponse } from "./payment-gateway-response";
import { PaymentLinks } from "./payment-links";
import { Refund } from "./refund";
import { stringFormat } from "../utils/format-util";


/**
 * Class Order
 *
 * @property string id
 * @property string orderId
 * @property string merchantId
 * @property string txnId
 * @property float amount
 * @property string currency
 * @property string customerId
 * @property string customerEmail
 * @property string customerPhone
 * @property string description
 * @property string productId
 * @property int gatewayId
 * @property string returnUrl
 * @property string udf1
 * @property string udf2
 * @property string udf3
 * @property string udf4
 * @property string udf5
 * @property string udf6
 * @property string udf7
 * @property string udf8
 * @property string udf9
 * @property string udf10
 * @property string status
 * @property int statusId
 * @property bool refunded
 * @property float amountRefunded
 * @property Refund[] refunds
 * @property string bankErrorCode
 * @property string bankErrorMessage
 * @property string paymentMethodType
 * @property string paymentMethod
 * @property Card card
 * @property PaymentGatewayResponse paymentGatewayResponse
 * @property PaymentLinks paymentLinks
 *
 */
export class Order extends BaseEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);

            if (newKey == "card") {
                this[newKey] = new Card(params[key]);
            } else if (newKey == "paymentGatewayResponse") {
                this[newKey] = new PaymentGatewayResponse(params[key]);
            } else if (newKey == "refunds") {
                let refunds = Array();

                for (let i = 0; i < params[key].length; i++) {
                    refunds[i] = new Refund(params[key][i]);
                }

                this[newKey] = refunds;
            } else if (newKey == "paymentLinks") {
                this[newKey] = new PaymentLinks(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Order
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

        const source = this.LOGGING_CONFIG.includes(PaymentSource.CREATE_ORDER) ? PaymentSource.CREATE_ORDER : "";
        return new Promise(async (resolve, reject) => {
            try {
                let response: any = await this.apiCall(source, Endpoints.Order.CREATE, params, RequestMethod.POST, requestOptions);
                response = Order.addInputParamsToResponse(params, response);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
            } catch (error) {
                reject(error);
            }
        });
    }

    static get(params: string, requestOptions = undefined) {
        const source = this.LOGGING_CONFIG.includes(PaymentSource.GET_ORDER) ? PaymentSource.GET_ORDER : "";
        return new Promise(async (resolve, reject) => {
            try {
                const url = stringFormat(Endpoints.Order.GET, { orderId: params });
                let response = this.apiCall(source, url, undefined, RequestMethod.GET, requestOptions);
                resolve(response);
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
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static status(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.GET_ORDER_STATUS) ? PaymentSource.GET_ORDER_STATUS : "";
        return new Promise(async (resolve, reject) => {
            try {
                let response: any = await this.apiCall(source, Endpoints.Order.STATUS, params, RequestMethod.POST, requestOptions);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
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
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static update(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.UPDATE_ORDER) ? PaymentSource.UPDATE_ORDER : "";
        return new Promise(async (resolve, reject) => {
            try {
                //const url = stringFormat(Endpoints.Order.UPDATE, { orderId: params?.orderId });
                let response = await this.apiCall(source, Endpoints.Order.UPDATE, {
                    order_id: params?.orderId,
                    amount: params?.amount
                }, RequestMethod.POST, requestOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     *
     * @param array|null params
     * @param RequestOptions|null requestOptions
     *
     * @return OrderList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(params: any, requestOptions = undefined) {
        const source = this.LOGGING_CONFIG.includes(PaymentSource.LIST_ALL_ORDERS) ? PaymentSource.LIST_ALL_ORDERS : "";
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(source, Endpoints.Order.LIST, params, RequestMethod.GET, requestOptions);
                resolve(new OrderList(response));
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
     * @return Order
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refund(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.REFUND_ORDER) ? PaymentSource.REFUND_ORDER : "";
        return new Promise(async (resolve, reject) => {
            try {
                let response: any = await this.apiCall(source, Endpoints.Order.REFUND, params, RequestMethod.POST, requestOptions);
                response = Order.updateOrderResponseStructure(response);
                resolve(new Order(response));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Restructuring the order response.
     *
     * @param array response
     *
     * @return array
     */
    static updateOrderResponseStructure(response: any) {
        if ("card" in response) {
            let card = response.card;
            card.card_exp_month = card.expiry_month;
            card.card_exp_year = card.expiry_year;
            delete card.expiry_month;
            delete card.expiry_year;
        }

        return response;
    }

};

