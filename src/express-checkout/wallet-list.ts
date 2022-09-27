import { Wallet } from './wallet';
import { BaseEntityList } from '../models/base/base-entity-list';

/**
 * Class WalletList
 *
 * @package Juspay\Model
 */
export class WalletList extends BaseEntityList {

    /**
     * Constructor
     *
     * @param array params
     */
    constructor(params: any) {
        super(params);

        for (var i = 0; i < params.list.length; i++) {
            this.list[i] = new Wallet(params.list[i]);
        }
    }

};

