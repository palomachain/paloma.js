import { Fee, MsgSend } from '../src';
import { LocalPaloma } from '../src';
import { CLIKey } from '../src/key/CLIKey';

const paloma = new LocalPaloma();
const { test1 } = paloma.wallets;
const cliKey = new CLIKey({ keyName: 'operator' });

const cliWallet = paloma.wallet(cliKey);

const send = new MsgSend(cliWallet.key.accAddress, test1.key.accAddress, {
  uluna: 100000,
});

async function main() {
  const tx = await cliWallet.createAndSignTx({
    msgs: [send],
    fee: new Fee(100000, { uluna: 100000 }, '', ''),
  });

  console.log(await paloma.tx.broadcast(tx));
}

main().catch(console.error);
