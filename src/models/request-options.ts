// Other Imports
import { JuspayEnv } from "./env/justpay-env";


export class RequestOptions {

  private apiKey: string;

  /**
   * Constructor
   */
  constructor() {
    this.apiKey = JuspayEnv.getApiKey();
  }

  /**
  * Returns a RequestOptions object with default values
  * from JuspayEnv object.
  *
  * @return RequestOptions
  */
  static createDefault() {
    JuspayEnv.init();
    return new RequestOptions();
  }

  /**
   * Initializes the RequestOptions object with given API Key.
   *
   * @param string apiKey
   *
   * @return RequestOptions
   */
  withApiKey(apiKey: string) {
    this.apiKey = apiKey;
    return this;
  }

  /**
   *
   * @return string
   */
  getApiKey() {
    return this.apiKey;
  }

};
