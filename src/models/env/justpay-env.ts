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
  static merchantId: string;

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
   * @property string
   */
  static extras: any;

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
      JuspayEnv.merchantId = "";
      JuspayEnv.apiKey = "";
      JuspayEnv.apiVersion = "2021-03-25";
      JuspayEnv.baseUrl = JuspayEnv.SANDBOX_BASE_URL;
      JuspayEnv.connectTimeout = 15;
      JuspayEnv.readTimeout = 30;
      JuspayEnv.sdkVersion = "1.0.0";
      JuspayEnv.extras = null;
      JuspayEnv.thisObj = new JuspayEnv();
      return JuspayEnv.thisObj;
    }
  }

  /**
   * Initializes the Juspay ExpressCheckout payment environment.
   *
   * @param  merchantId               {String} 
   * @param  apiKey                   {string}
   * @param  baseUrl                  {string}
   * @param  connectTimeout           {number}
   * @param  readTimeout              {number}
   *
   * @return JuspayEnv
   */
  static withCredentials(merchantId: string, apiKey: string, baseUrl?: string, connectTimeout?: number, readTimeout?: number, extras?: any) {
    JuspayEnv.merchantId = merchantId;
    JuspayEnv.apiKey = apiKey;

    if (baseUrl) {
      JuspayEnv.baseUrl = baseUrl;
    }

    if (connectTimeout) {
      JuspayEnv.connectTimeout = connectTimeout;
    }

    if (readTimeout) {
      JuspayEnv.readTimeout = readTimeout;
    }

    if (extras) {
      JuspayEnv.extras = extras;
    }
    return this;
  }

  /**
  *
  * @return string
  */
  static getMerchantId() {
    return JuspayEnv.merchantId;
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

  /**
  *
  * @return string
  */
  static getLoggingBaseUrl() {
    if (JuspayEnv?.extras) {
      return JuspayEnv?.extras?.loggingBaseUrl;
    }
    return "";
  }

  /**
  *
  * @return string
  */
  static getOrgCode() {
    if (JuspayEnv?.extras) {
      return JuspayEnv?.extras?.orgCode;
    }
    return "";
  }

  /**
  *
  * @return string
  */
  static getOrgId() {
    if (JuspayEnv?.extras) {
      return JuspayEnv?.extras?.orgId;
    }
    return "";
  }

  /**
  *
  * @return string
  */
  static getDomainId() {
    if (JuspayEnv?.extras) {
      return JuspayEnv?.extras?.domainId;
    }
    return "";
  }
};
