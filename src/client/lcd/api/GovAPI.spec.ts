import { GovAPI } from './GovAPI';
import { Coins, Dec, Int, Proposal } from '../../../core';
import { Deposit } from '@palomachain/paloma.proto/cosmos/gov/v1beta1/gov';
import { LCDClient } from '../LCDClient';

const INTEGRATION = process.env.PALOMA_INTEGRATION == 'TRUE' || false;

if (INTEGRATION) {
  const paloma = new LCDClient({
    chainID: 'pisco-1',
    URL: 'http://localhost:1317',
  });
  const gov = new GovAPI(paloma);

  describe('GovAPI', () => {
    it('parameters', async () => {
      await expect(gov.parameters()).resolves.toMatchObject({
        deposit_params: {
          min_deposit: expect.any(Coins),
          max_deposit_period: expect.any(Number),
        },
        voting_params: {
          voting_period: expect.any(Number),
        },
        tally_params: {
          quorum: expect.any(Dec),
          threshold: expect.any(Dec),
          veto_threshold: expect.any(Dec),
        },
      });
    });

    it('tally', async () => {
      const proposalId = await gov.proposals().then(v => v[0][0].id);
      await expect(gov.tally(proposalId)).resolves.toMatchObject({
        yes: expect.any(Int),
        abstain: expect.any(Int),
        no: expect.any(Int),
        no_with_veto: expect.any(Int),
      });
    });

    it('proposals', async () => {
      const proposals = await gov.proposals().then(v => v[0]);
      expect(proposals).toContainEqual(expect.any(Proposal));
    });

    it('proposal', async () => {
      const proposalId = await gov.proposals().then(v => v[0][0].id);
      const proposal = await gov.proposal(proposalId);
      expect(proposal).toEqual(expect.any(Proposal));
    });

    it('proposer', async () => {
      const proposalId = await gov.proposals().then(v => v[0][0].id);
      const proposer = await gov.proposer(proposalId);
      expect(proposer).toEqual(expect.any(String));
    });

    it('initialDeposit', async () => {
      const proposalId = await gov.proposals().then(v => v[0][0].id);
      const initialDeposit = await gov.initialDeposit(proposalId);
      expect(initialDeposit).toEqual(expect.any(Coins));
    });

    it('deposits', async () => {
      const proposals = await gov.proposals().then(v => v[0]);
      const proposalId = proposals[0].id;
      const deposits = await gov.deposits(proposalId).then(v => v[0][0]);
      if (deposits !== undefined) {
        expect(deposits).toEqual(expect.any(Deposit));
      }
    });
  });
} else {
  test('NO INTEGRATION', () => {
    expect(INTEGRATION).toBe(false);
  });
}
