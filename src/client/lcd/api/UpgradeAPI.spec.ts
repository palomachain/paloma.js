import { Plan } from '../../../core';
import { LCDClient } from '../LCDClient';
import { UpgradeAPI } from './UpgradeAPI.ts';

const INTEGRATION = process.env.PALOMA_INTEGRATION == 'TRUE' || false;

if (INTEGRATION) {
  const paloma = new LCDClient({
    chainID: 'pisco-1',
    URL: 'http://localhost:1317',
  });
  const upgrade = new UpgradeAPI(paloma);

  describe('UpgradeAPI', () => {
    describe('applied_plan', () => {
      it('0 for invalid name', async () => {
        const height = await upgrade.appliedPlan('there_is_no_plan_like_this');
        expect(height).toEqual(0);
      });
    });

    describe('current_plan', () => {
      it('null plan', async () => {
        const plan = await upgrade.currentPlan();
        expect(plan == null || plan instanceof Plan);
      });
    });

    describe('node_versions', () => {
      it('module count', async () => {
        expect(await upgrade.moduleVersions()).toHaveLength(21);
      });
    });
  });
} else {
  test('NO INTEGRATION', () => {
    expect(INTEGRATION).toBe(false);
  });
}
