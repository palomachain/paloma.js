import {
  AccAddress,
  ValAddress,
  AccPubKey,
  ValPubKey,
  ValConsAddress,
} from './bech32';
import { bech32 } from 'bech32';

describe('AccAddress', () => {
  it('validates account address', () => {
    expect(
      AccAddress.validate(
        'palomavaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk'
      )
    ).toBe(false);

    expect(
      AccAddress.validate('paloma1pdx498r0h7c2fj36sjhs8vu8rz9hd2cw0tmam9')
    ).toBe(false); // bad checksum

    expect(
      AccAddress.validate('cosmos176m2p8l3fps3dal7h8gf9jvrv98tu3rqfdht86')
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('paloma', words);

    expect(AccAddress.validate(badAddress)).toBe(false);
    // normal account address
    expect(
      AccAddress.validate('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s')
    ).toBe(true);
    // contract account address
    expect(
      AccAddress.validate('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s')
    ).toBe(true);
  });

  it('converts from validator address', () => {
    expect(
      AccAddress.fromValAddress('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s')
    ).toEqual('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s');
  });
});

describe('ValAddress', () => {
  it('validates validator address', () => {
    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('palomavaloper', words);

    expect(ValAddress.validate(badAddress)).toBe(false);

    expect(
      ValAddress.validate(
        'palomavaloper17tsule2h035rlqwjs2q828kjtwf59f8wmru7nr'
      )
    ).toBe(true);
  });

  it('converts from account address', () => {
    expect(
      ValAddress.fromAccAddress('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s')
    ).toEqual('palomavaloper17tsule2h035rlqwjs2q828kjtwf59f8wmru7nr');
  });
});

describe('AccPubKey', () => {
  it('validates account pubkey', () => {
    expect(
      AccPubKey.validate(
        'palomavaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
      )
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('palomapub', words);

    expect(AccPubKey.validate(badPubKey)).toBe(false);
    expect(
      AccPubKey.validate('palomapub17tsule2h035rlqwjs2q828kjtwf59f8wlpqfun')
    ).toBe(true);
  });

  it('converts from validator pubkey', () => {
    expect(
      AccPubKey.fromAccAddress('paloma17tsule2h035rlqwjs2q828kjtwf59f8w5ntz9s')
    ).toEqual('palomapub17tsule2h035rlqwjs2q828kjtwf59f8wlpqfun');
  });
});

describe('ValPubKey', () => {
  it('validates validator pubkey', () => {
    expect(
      ValPubKey.validate(
        'palomavaloperpub17tsule2h035rlqwjs2q828kjtwf59f8w3zfjvp'
      )
    ).toBe(true);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('palomapub', words);

    expect(ValPubKey.validate(badPubKey)).toBe(false);
    expect(
      ValPubKey.validate('palomavaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q')
    ).toBe(false);
  });

  it('converts from validator address', () => {
    expect(
      ValPubKey.fromValAddress(
        'palomavaloper17tsule2h035rlqwjs2q828kjtwf59f8wmru7nr'
      )
    ).toEqual('palomavaloperpub17tsule2h035rlqwjs2q828kjtwf59f8w3zfjvp');
  });
});

describe('ValConsAddress', () => {
  it('validate validator consensus address', () => {
    const vals = bech32.decode(
      'palomavaloper17tsule2h035rlqwjs2q828kjtwf59f8wmru7nr'
    );
    const valConAddress = bech32.encode('palomavalcons', vals.words);

    expect(ValConsAddress.validate(valConAddress)).toBeTruthy();
  });
});
