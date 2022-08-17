import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';

describe('MsgAggregateExchangeRateVote', () => {
  it('getAggregateVoteHash', () => {
    const msg = new MsgAggregateExchangeRateVote(
      {
        ukrw: '245.000',
        uusd: '0.2242',
        usdr: '0.182',
      },
      'salt',
      'paloma1krj7amhhagjnyg2tkkuh6l0550y733jnjulzjh',
      'palomavaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy'
    );
    msg.getPrevote();
    expect(msg.getAggregateVoteHash()).toEqual(
      'a12549823646f6df41410c9cced6b3d3d19396f3'
    );
  });
  it('conversion', () => {
    const msg = new MsgAggregateExchangeRateVote(
      {
        ukrw: '245.000',
        uusd: '0.2242',
        usdr: '0.182',
      },
      'salt',
      'paloma1krj7amhhagjnyg2tkkuh6l0550y733jnjulzjh',
      'palomavaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy'
    );
    const anyObj = msg.packAny(true);
    expect(MsgAggregateExchangeRateVote.unpackAny(anyObj, true)).toBeDefined();
  });
});
