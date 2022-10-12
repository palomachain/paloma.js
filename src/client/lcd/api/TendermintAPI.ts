import { BaseAPI } from './BaseAPI';
import { BlockInfo, DelegateValidator } from '../../../core';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class TendermintAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the node's information.
   */
  public async nodeInfo(params: APIParams = {}): Promise<object> {
    return this.c.getRaw(`/status`, params);
  }

  /**
   * Gets whether the node is currently in syncing mode to catch up with blocks.
   */
  public async syncing(params: APIParams = {}): Promise<boolean> {
    return this.c.getRaw(`/status`, params);
  }

  /**
   * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
   * @param height block height
   */
  public async validatorSet(
    height?: number,
    params: APIParams = {}
  ): Promise<[DelegateValidator[], Pagination]> {
    return this.c.getRaw(`/validators?height=${height}`, params);
  }

  /**
   * Gets the block information at the specified height. If no height is given, the latest block is returned.
   * @param height block height.
   */
  public async blockInfo(
    height?: number,
    params: APIParams = {}
  ): Promise<BlockInfo> {
    return this.c.getRaw(`/block?height=${height}`, params);
  }
}
