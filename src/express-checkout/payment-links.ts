import { BaseEntity } from "../models/base/base-entity";

/**
 * Class PaymentLinks
 *
 * @property string web
 * @property string mobile
 * @property string iframe
 *
 */
export class PaymentLinks extends BaseEntity {

    /**
    * Constructor
    *
    * @param array params
    */
    constructor(params: any) {
        super();
        for (var key of Object.values(Object.keys(params))) {
            var newKey = this.camelize(key);
            this[newKey] = params[key];
        }
    }

};

