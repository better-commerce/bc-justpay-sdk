import { BaseEntity } from "../models/base/base-entity";

/**
 * Class PaymentGatewayResponse
 *
 * @property string rrn
 * @property string epgTxnId
 * @property string authIdCode
 * @property string txnId
 * @property string respCode
 * @property string respMessage
 * @property DateTime created
 *
 */
export class PaymentGatewayResponse extends BaseEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (let key of Object.values(Object.keys(params))) {
            let newKey = this.camelize(key);

            if (newKey == "created") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

};

