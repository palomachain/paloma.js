import { TendermintAPI } from './TendermintAPI';
import { Tx } from '../../../core/Tx';
import { Tx as Tx_pb } from '@palomachain/legacy.proto/cosmos/tx/v1beta1/tx';
import { LCDClient } from '../LCDClient';

const INTEGRATION = process.env.PALOMA_INTEGRATION == 'TRUE' || false;

if (INTEGRATION) {
  const paloma = new LCDClient({
    chainID: 'pisco-1',
    URL: 'http://localhost:1317',
  });
  const tendermint = new TendermintAPI(paloma);

  describe('TendermintAPI', () => {
    it('load block and decode txs', async () => {
      const blockInfo = await tendermint.blockInfo(1);
      if (blockInfo.block.data.txs != null) {
        blockInfo.block.data.txs.every(txBytes => {
          const txProto = Tx_pb.decode(Buffer.from(txBytes, 'base64'));
          expect(Tx.fromProto(txProto)).toBeDefined();
        });
      }
    });

    it('node info', async () => {
      await expect(tendermint.nodeInfo()).resolves.toBeInstanceOf(Object);
    });

    it('syncing', async () => {
      await expect(tendermint.syncing()).resolves;
    });

    it('validator set (latest)', async () => {
      const vals = await tendermint.validatorSet();

      expect(vals[0]).toContainEqual({
        address: expect.any(String),
        pub_key: {
          '@type': expect.any(String),
          key: expect.any(String),
        },
        proposer_priority: expect.any(String),
        voting_power: expect.any(String),
      });
    });

    it('validator set (1)', async () => {
      const vals = await tendermint.validatorSet(1);

      expect(vals[0]).toContainEqual({
        address: expect.any(String),
        pub_key: {
          '@type': expect.any(String),
          key: expect.any(String),
        },
        proposer_priority: expect.any(String),
        voting_power: expect.any(String),
      });
    });

    it('block info', async () => {
      const block = await tendermint.blockInfo();

      expect(block).toMatchObject({
        block: expect.any(Object),
      });
    });
  });
} else {
  test('NO INTEGRATION', () => {
    expect(INTEGRATION).toBe(false);
  });
}
