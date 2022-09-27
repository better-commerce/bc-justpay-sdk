import { BaseEntity } from "../models/base/base-entity";

/**
 * Class Refund
 *
 * @property string id
 * @property string uniqueRequestId
 * @property string ref
 * @property float amount
 * @property DateTime created
 * @property string status
 *
 */
export class Refund extends BaseEntity {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);

            if (newKey == "created") {
                this[newKey] = new Date(params[key]);
            } else {
                this[newKey] = params[key];
            }
        }
    }

};
