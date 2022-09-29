import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";
import { stringFormat } from "../utils/format-util";

/**
 * Class Customer
 *
 * @property string id
 * @property string object
 * @property string firstName
 * @property string lastName
 * @property string mobileCountryCode
 * @property string mobileNumber
 * @property string emailAddress
 * @property DateTime dateCreated
 * @property DateTime lastUpdated
 * @property string objectReferenceId
 *
 */
export class Customer extends BaseEntity {
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
        console.log(this);
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
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

        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(Endpoints.Customer.CREATE_OR_LIST, params, RequestMethod.POST, requestOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });

    }

    /**
     *
     * @param string id
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static update(id: string, params: any, requestOptions = undefined) {
        if (id == undefined || id == "" || params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = stringFormat(Endpoints.Customer.GET_OR_UPDATE, { id: id });
                let response = await this.apiCall(url, params, RequestMethod.POST, requestOptions);
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
     * @return CustomerList
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(params: any, requestOptions = undefined) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.apiCall(Endpoints.Customer.CREATE_OR_LIST, params, RequestMethod.GET, requestOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     *
     * @param string id
     * @param RequestOptions|null requestOptions
     *
     * @return Customer
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static get(id: string, requestOptions = undefined) {
        if (id == undefined || id == "") {
            throw new InvalidRequestException();
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = stringFormat(Endpoints.Customer.GET_OR_UPDATE, { id: id });
                let response = await this.apiCall(url, undefined, RequestMethod.GET, requestOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

};
