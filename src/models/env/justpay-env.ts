import { Endpoints } from "../../constants/constants";

/**
 * Class JuspayEnv
 *
 */
export class JuspayEnv {

  static SANDBOX_BASE_URL;
  static PRODUCTION_BASE_URL;

  // Static variables
  /**
   *
   * @property string
   */
  static apiKey: string;
  /**
   *
   * @property string
   */
  static apiVersion: string;
  /**
   *
   * @property string
   */
  static baseUrl: string;
  /**
   *
   * @property int
   */
  static connectTimeout: number;
  /**
   *
   * @property int
   */
  static readTimeout: number;
  /**
   *
   * @property string
   */
  static sdkVersion: string;
  /**
   *
   * @property JuspayEnv
   */
  static thisObj: any;

  /**
   * Initializes the Juspay ExpressCheckout payment environment with default
   * values and returns a singleton object of JuspayEnv class.
   *
   * @return JuspayEnv
   */
  static init() {

    JuspayEnv.SANDBOX_BASE_URL = Endpoints.Base.SANDBOX_URL;
    JuspayEnv.PRODUCTION_BASE_URL = Endpoints.Base.PRODUCTION_URL;

    if (JuspayEnv.thisObj != undefined) {
      return JuspayEnv.thisObj;
    } else {
      JuspayEnv.apiKey = "";
      JuspayEnv.apiVersion = "2021-03-25";
      JuspayEnv.baseUrl = JuspayEnv.SANDBOX_BASE_URL;
      JuspayEnv.connectTimeout = 15;
      JuspayEnv.readTimeout = 30;
      JuspayEnv.sdkVersion = "1.0.0";
      JuspayEnv.thisObj = new JuspayEnv();
      return JuspayEnv.thisObj;
    }
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given API Key.
   *
   * @param string apiKey
   *
   * @return JuspayEnv
   */
  withApiKey(apiKey) {
    JuspayEnv.apiKey = apiKey;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given Base URL.
   *
   * @param string baseUrl
   *
   * @return JuspayEnv
   */
  withBaseUrl(baseUrl) {
    JuspayEnv.baseUrl = baseUrl;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given connect timeout.
   *
   * @param int connectTimeout
   *
   * @return JuspayEnv
   */
  withConnectTimeout(connectTimeout) {
    JuspayEnv.connectTimeout = connectTimeout;
    return this;
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment
   * with given read timeout.
   *
   * @param int readTimeout
   *
   * @return JuspayEnv
   */
  withReadTimeout(readTimeout) {
    JuspayEnv.readTimeout = readTimeout;
    return this;
  }

  /**
  *
  * @return string
  */
  static getApiKey() {
    return JuspayEnv.apiKey;
  }

  /**
  *
  * @return string
  */
  static getApiVersion() {
    return JuspayEnv.apiVersion;
  }

  /**
   *
   * @return string
   */
  static getBaseUrl() {
    return JuspayEnv.baseUrl;
  }

  /**
   *
   * @return int
   */
  static getConnectTimeout() {
    return JuspayEnv.connectTimeout;
  }

  /**
   *
   * @return int
   */
  static getReadTimeout() {
    return JuspayEnv.readTimeout;
  }

  /**
  *
  * @return string
  */
  static getSdkVersion() {
    return JuspayEnv.sdkVersion;
  }

};
