import { Order } from './order';
import { BaseEntityList } from '../models/base/base-entity-list';

/**
 * Class OrderList
 *
 */
export class OrderList extends BaseEntityList {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super(params);

        for (let i = 0; i < params.list.length; i++) {
            this.list[i] = new Order(params.list[i]);
        }
    }

};

