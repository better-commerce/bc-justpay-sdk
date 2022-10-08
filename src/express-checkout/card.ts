// Model Imports
import { InvalidRequestException } from "../models/exceptions/request/invalid-request-exception";

// Other Imports
import { Endpoints } from "../constants/constants";
import { RequestMethod } from "../constants/enums";
import { BaseEntity } from "../models/base/base-entity";

/**
 * Class Card
 *
 * @property string cardNumber
 * @property string nameOnCard
 * @property string cardExpYear
 * @property string cardExpMonth
 * @property string cardSecurityCode
 * @property string nickname
 * @property string cardToken
 * @property string cardReference
 * @property string cardFingerprint
 * @property string cardIsin
 * @property string lastFourDigits
 * @property string cardType
 * @property string cardIssuer
 * @property bool savedToLocker
 * @property bool expired
 * @property string cardBrand
 *
 */
export class Card extends BaseEntity {

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
     * @return Card
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

        let response = this.apiCall(Endpoints.Card.ADD, params, RequestMethod.POST, requestOptions);
        return new Card(response);
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return array
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static listAll(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        let response: any = this.apiCall(Endpoints.Card.LIST, params, RequestMethod.GET, requestOptions);
        let cardArray = Array();

        if ("cards" in response) {
            cardArray = response.cards;

            for (let i = 0; i < cardArray.length; i++) {
                cardArray[i] = new Card(cardArray[i]);
            }
        }

        return cardArray;
    }

    /**
     *
     * @param array params
     * @param RequestOptions|null requestOptions
     *
     * @return bool
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    static delete(params: any, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        let response: any = this.apiCall(Endpoints.Card.DELETE, params, RequestMethod.POST, requestOptions);
        return response.deleted;
    }

    static binInfo(params: string, requestOptions = undefined) {
        if (params == undefined || params.length == 0) {
            throw new InvalidRequestException();
        }

        let response: any = this.apiCall(`${Endpoints.Card.BIN_INFO}/${params}`, undefined, RequestMethod.GET, requestOptions);
        return response;
    }

};

