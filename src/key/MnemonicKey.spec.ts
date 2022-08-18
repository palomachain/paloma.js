import { MnemonicKey } from './MnemonicKey';
import { MsgSend, MsgMultiSend } from '../core/bank/msgs';
import { Coins } from '../core/Coins';
import { Fee } from '../core/Fee';
import { AuthInfo, TxBody } from '../core/Tx';
import { SignDoc } from '../core/SignDoc';
import { SimplePublicKey } from '../core';

describe('MnemonicKey', () => {
  it('generates random mnemonic', () => {
    const mk = new MnemonicKey();
    const mk2 = new MnemonicKey();
    expect(mk.mnemonic).not.toEqual(mk2.mnemonic);
  });

  it('signature', async () => {
    const mk = new MnemonicKey({
      mnemonic:
        'island relax shop such yellow opinion find know caught erode blue dolphin behind coach tattoo light focus snake common size analyst imitate employ walnut',
    });
    const { accAddress } = mk;

    const msgSend = new MsgSend(
      accAddress,
      'paloma1wg2mlrxdmnnkkykgqg4znky86nyrtc45q336yv',
      new Coins({ uluna: '100000000' })
    );

    const fee = new Fee(46467, new Coins({ uluna: '698' }));
    const signDoc = new SignDoc(
      'columbus-3-testnet',
      45,
      0,
      new AuthInfo([], fee),
      new TxBody([msgSend])
    );

    const {
      data: { single },
    } = await mk.createSignatureAmino(signDoc, true);
    expect((single as any).signature).toEqual(
      'n0N2fjCxPdaHJN7ZVeEcjn9JACBSiHQ+Kv0Ulf9tUxIVCwrRkdQGoxqKmGhL0D0HbbUh2sUVNAHDAeUR57CUxg=='
    );
  });

  it('multisig', async () => {
    const receiverAddr = 'paloma1ptdx6akgk7wwemlk5j73artt5t6j8am08ql3qv';
    const multisigAddr = 'paloma16ddrexknvk2e443jsnle4n6s2ewjc6z3mjcu6d';
    const multisigAccountNumber = 46;
    const multisigSequenceNumber = 0;
    const a1Key = new MnemonicKey({
      mnemonic:
        'swamp increase solar renew twelve easily possible pig ostrich harvest more indicate lion denial kind target small dumb mercy under proud arrive gentle field',
    });
    expect(a1Key.accAddress).toEqual(
      'paloma1gknfqc7lr2djyf0ttzp6mmdvq3wp5gf04788rh'
    );
    const a2Key = new MnemonicKey({
      mnemonic:
        'service frozen keen unveil luggage initial surge name conduct mesh soup escape weather gas clown brand holiday result protect chat plug false pitch little',
    });
    expect(a2Key.accAddress).toEqual(
      'paloma1cz7urn9f27kelsam6m4tlsegfcapp2hwpclte7'
    );
    const a3Key = new MnemonicKey({
      mnemonic:
        'corn peasant blue sight spy three stove confirm night brother vote dish reduce sick observe outside vacant arena laugh devote exotic wasp supply rally',
    });
    expect(a3Key.accAddress).toEqual(
      'paloma1hkehyn7dlvwssrhf3kwxf9azwm3pn8wjkyy3x2'
    );

    const msgSend = new MsgSend(
      multisigAddr,
      receiverAddr,
      new Coins({ uluna: 100000000 })
    );

    const signDoc = new SignDoc(
      'columbus-3-testnet',
      multisigAccountNumber,
      multisigSequenceNumber,
      new AuthInfo([], new Fee(50000, { uluna: 750 })),
      new TxBody([msgSend])
    );

    const a3Signature = await a3Key.createSignatureAmino(signDoc, true);
    expect((a3Signature.data.single as any).signature).toEqual(
      'FNcL8ozeZDVfBogXykZkH2x+KhiRL0dcdjBTLToTg3sf5H6g2PBFPQCzSvnPN1pOiHsQI8WwikUmtgW00k3lrQ=='
    );
  });

  it('multisend', async () => {
    const key = new MnemonicKey({
      mnemonic:
        'spatial fantasy weekend romance entire million celery final moon solid route theory way hockey north trigger advice balcony melody fabric alter bullet twice push',
    });

    const signDoc = new SignDoc(
      'columbus-3-testnet',
      47,
      0,
      new AuthInfo([], new Fee(100000, { uluna: 1500, usdr: 1000 })),
      new TxBody(
        [
          new MsgMultiSend(
            [
              new MsgMultiSend.Input(key.accAddress, {
                uluna: 1000000,
                usdr: 1000000,
              }),
            ],
            [
              new MsgMultiSend.Output(
                'paloma1gknfqc7lr2djyf0ttzp6mmdvq3wp5gf04788rh',
                {
                  uluna: 500000,
                }
              ),
              new MsgMultiSend.Output(
                'paloma1ptdx6akgk7wwemlk5j73artt5t6j8am08ql3qv',
                {
                  uluna: 500000,
                  usdr: 1000000,
                }
              ),
            ]
          ),
        ],
        '1234'
      )
    );

    const signature = await key.createSignatureAmino(signDoc, true);
    expect((signature.data.single as any).signature).toEqual(
      'v5WiW3Q9tzU+MVjLTsmHl4acACWDZg1jkRrp84v9O11aDCi5AuYpNslK9Y1E+9n0cEfS+f/f+TCOhO6nR37FfQ=='
    );
  });
});
