import { MarketAPI } from './MarketAPI';
import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';

const paloma = new LCDClient({
  chainID: 'pisco-1',
  URL: 'http://localhost:1317/',
});
const market = new MarketAPI(paloma);

describe('MarketAPI', () => {
  it('parameters', async () => {
    if (paloma.config.isClassic) {
      // only classic network has param query
      await expect(market.parameters()).resolves.toMatchObject({
        pool_recovery_period: expect.any(Number),
        base_pool: expect.any(Dec),
        min_stability_spread: expect.any(Dec),
      });
    }
  });
});
