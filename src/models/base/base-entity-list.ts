/**
 * Class BaseEntityList
 *
 * @property array list
 * @property int count
 * @property int offset
 * @property int total
 *
 */
export class BaseEntityList {

  count: number;
  offset: number;
  total: number;
  list: Array<any>;

  /**
   * Constructor
   *
   * @param array params
   */
  constructor(params: any) {
    this.count = params.count;
    this.offset = params.offset;
    this.total = params.total;
    this.list = new Array();
  }

};
