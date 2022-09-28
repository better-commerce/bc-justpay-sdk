import { Customer } from './customer';
import { BaseEntityList } from '../models/base/base-entity-list';

/**
 * Class CustomerList
 *
 */
export class CustomerList extends BaseEntityList {
    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super(params);

        for (let i = 0; i < params.list.length; i++) {
            this.list[i] = new Customer(params.list[i]);
        }
    }

};

