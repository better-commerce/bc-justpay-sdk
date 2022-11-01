/*! bc-juspay-sdk
//@ File: base-entity.ts
//@ Description: Encapsulates base functionality.
*/

// Package Imports
import * as _ from "lodash";
import * as querystring from "querystring";

// Other Imports
import api from "../../api";
import { RequestMethod } from "../../constants/enums";
import { consoleLog } from "../../utils/log-util";
import { JuspayEnv } from "../env/justpay-env";
import { APIException } from "../exceptions/api/api-exception";
import { AuthenticationException } from "../exceptions/generic/authentication-exception";
import { InvalidRequestException } from "../exceptions/request/invalid-request-exception";
import { RequestOptions } from "../request-options";

/**
 * Class BaseEntity
 *
 */
export class BaseEntity {

    /**
     *
     * @param string path
     * @param array|null params
     * @param string method
     * @param RequestOptions|null requestOptions
     *
     * @return array
     *
     * @throws APIConnectionException
     * @throws APIException
     * @throws AuthenticationException
     * @throws InvalidRequestException
     */
    protected static apiCall(path: string, params: any, method: string, requestOptions: RequestOptions, isAuthRequired = true, requestHeaders: any = {}) {
        return new Promise((resolve, reject) => {
            if (requestOptions == undefined) {
                requestOptions = RequestOptions.createDefault();
            }
            let headers = {
                'merchant-id': JuspayEnv.getMerchantId(),
                'version': JuspayEnv.getApiVersion(),
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            if (isAuthRequired) {
                const authorization = `Basic ${btoa(JuspayEnv.apiKey)}`;
                headers = {
                    ...headers,
                    ...{ 'Authorization': authorization, },
                    ...{ ...requestHeaders },
                };
            }

            let options: any = {
                url: path,
                baseURL: JuspayEnv.getBaseUrl(),
                /*auth: {
                    username: JuspayEnv.getApiKey(),
                    password: ''
                },*/
                headers: headers,
            };

            /*if (JuspayEnv.getConnectTimeout()) {
                options = { ...options, ...{ timeout: JuspayEnv.getConnectTimeout() } };
            }*/

            if (method == RequestMethod.GET) {
                options.method = RequestMethod.GET;

                if (params != undefined) {
                    options.params = params;
                }
            } else {
                options.method = RequestMethod.POST;

                if (params == undefined) {

                } else {
                    options.data = querystring.stringify(params);
                }
            }

            api(options)
                .then((response) => {
                    let responseCode = response.status;
                    let responseBody = response.data;
                    if (responseCode >= 200 && responseCode < 300) {
                        resolve(responseBody);
                    } else {
                        let status = undefined;
                        let errorCode = undefined;
                        let errorMessage = undefined;

                        if (responseBody != undefined) {
                            if ("status" in responseBody != undefined) {
                                status = responseBody.status;
                            }

                            if ("error_code" in responseBody != undefined) {
                                errorCode = responseBody.error_code;
                            }

                            if ("error_message" in responseBody != undefined) {
                                errorMessage = responseBody.error_message;
                            }
                        }

                        switch (responseCode) {
                            case 400:
                            case 404:
                                throw new InvalidRequestException(responseCode, status, errorCode, errorMessage);

                            case 401:
                                throw new AuthenticationException(responseCode, status, errorCode, errorMessage);

                            default:
                                throw new APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
                        }
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        consoleLog(error.response.data);
                        consoleLog(error.response.status);
                        consoleLog(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        consoleLog(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        consoleLog('Error: ' + error.message);
                    }
                    reject(error);
                });
        })

    }

    /**
     *
     * @param string input
     * @param string|null separator
     *
     * @return string
     */
    protected camelize(input: string, separator: string = "_") {

        return _.camelCase(input);
    }

    /**
     *
     * @param array params
     * @param array response
     *
     * @return array
     */
    protected static addInputParamsToResponse(params: Array<any>, response: Array<any>) {
        for (let key of Object.values(Object.keys(params))) {
            response[key] = params[key];
        }
        return response;
    }

};

