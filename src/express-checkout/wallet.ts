// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { Endpoints, PaymentSource } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { stringFormat } from "../utils/format-util";
import { WalletList } from "./wallet-list";

/**
 * Class Wallet
 *
 * @property string id
 * @property string object
 * @property string wallet
 * @property string token
 * @property boolean linked
 * @property float currentBalance
 * @property DateTime lastRefreshed
 *
 * @package Juspay\Model
 */
export class Wallet extends BaseEntity {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);

            if (newKey == "lastRefreshed") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

    /**
     *
     * @param string customerId
     * @param RequestOptions|null requestOptions
     *
     * @return WalletList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(customerId: string, requestOptions = undefined) {
        if (customerId == undefined || customerId == "") {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.LIST_ALL_WALLETS) ? PaymentSource.LIST_ALL_WALLETS : "";
        const url = stringFormat(Endpoints.Wallet.LIST, { customerId: customerId });
        let response = this.apiCall(source, url, undefined, RequestMethod.GET, requestOptions);
        return new WalletList(response);
    }

    /**
     *
     * @param string customerId
     * @param RequestOptions|null requestOptions
     *
     * @return WalletList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refresh(customerId: string, requestOptions = undefined) {
        if (customerId == undefined || customerId == "") {
            throw new InvalidRequestException();
        }

        const source = this.LOGGING_CONFIG.includes(PaymentSource.REFRESH_WALLET_BALANCE) ? PaymentSource.REFRESH_WALLET_BALANCE : "";
        const url = stringFormat(Endpoints.Wallet.REFRESH_BALANCES, { customerId: customerId });
        let response = this.apiCall(source, url, undefined, RequestMethod.GET, requestOptions);
        return new WalletList(response);
    }

    /**
     *
     * @param string customerId
     * @param string gateway
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static create(customerId: string, gateway: string, requestOptions = undefined) {
        if (customerId == undefined || customerId == "" || gateway == undefined || gateway == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.gateway = gateway;
        const source = this.LOGGING_CONFIG.includes(PaymentSource.CREATE_WALLET) ? PaymentSource.CREATE_WALLET : "";
        const url = stringFormat(Endpoints.Wallet.CREATE, { customerId: customerId });
        let response = this.apiCall(source, url, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string customerId
     * @param string gateway
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static createAndAuthenticate(customerId: string, gateway: string, requestOptions = undefined) {
        if (customerId == undefined || customerId == "" || gateway == undefined || gateway == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.gateway = gateway;
        params.command = "authenticate";
        const source = this.LOGGING_CONFIG.includes(PaymentSource.CREATE_AND_AUTHENTICATE_WALLET) ? PaymentSource.CREATE_AND_AUTHENTICATE_WALLET : "";
        const url = stringFormat(Endpoints.Wallet.CREATE, { customerId: customerId });
        let response = this.apiCall(source, url, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static refreshByWalletId(walletId: string, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.command = "refresh";
        const source = this.LOGGING_CONFIG.includes(PaymentSource.REFRESH_BY_WALLET_ID) ? PaymentSource.REFRESH_BY_WALLET_ID : "";
        const url = stringFormat(Endpoints.Wallet.REFRESH_OR_LINK_OR_DELINK, { walletId: walletId });
        let response = this.apiCall(source, url, params, RequestMethod.GET, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static authenticate(walletId: string, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.command = "authenticate";
        const source = this.LOGGING_CONFIG.includes(PaymentSource.AUTHENTICATE_WALLET) ? PaymentSource.AUTHENTICATE_WALLET : "";
        const url = stringFormat(Endpoints.Wallet.AUTHENTICATE, { walletId: walletId });
        let response = this.apiCall(source, url, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param string otp
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static link(walletId: string, otp: string, requestOptions = undefined) {
        if (walletId == undefined || walletId == "" || otp == undefined || otp == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.command = "link";
        params.otp = otp;
        const source = this.LOGGING_CONFIG.includes(PaymentSource.LINK_WALLET) ? PaymentSource.LINK_WALLET : "";
        const url = stringFormat(Endpoints.Wallet.REFRESH_OR_LINK_OR_DELINK, { walletId: walletId });
        let response = this.apiCall(source, url, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

    /**
     *
     * @param string walletId
     * @param RequestOptions|null requestOptions
     *
     * @return Wallet
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static delink(walletId: string, requestOptions = undefined) {
        if (walletId == undefined || walletId == "") {
            throw new InvalidRequestException();
        }

        let params = Object();
        params.command = "delink";
        const source = this.LOGGING_CONFIG.includes(PaymentSource.DELINK_WALLET) ? PaymentSource.DELINK_WALLET : "";
        const url = stringFormat(Endpoints.Wallet.REFRESH_OR_LINK_OR_DELINK, { walletId: walletId });
        let response = this.apiCall(source, url, params, RequestMethod.POST, requestOptions);
        return new Wallet(response);
    }

};
