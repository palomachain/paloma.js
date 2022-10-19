<h1 align="center">Welcome to The JavaScript SDK for Paloma 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://docs.palomachain.com" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/paloma_chain" target="_blank">
    <img alt="Twitter: paloma_chain" src="https://img.shields.io/twitter/follow/paloma_chain.svg?style=social" />
  </a>
</p>

> Your Javascript Library for Paloma

### 🏠 [Homepage](https://www.palomachain.com)

### 📚 [Docs](https://docs.palomachain.com)

Paloma.js is a JavaScript SDK for writing applications that interact with the Paloma blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Features

- **Written in TypeScript**, with type definitions
- Versatile support for key management solutions
- Works in Node.js, in the browser, and React Native
- Exposes the Paloma API through LCDClient
- Parses responses into native JavaScript types

We highly suggest using Paloma.js with TypeScript, or JavaScript in a code editor that has support for type declarations, so you can take advantage of the helpful type hints that are included with the package.

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@palomachain/paloma.js):

```sh
npm install @palomachain/paloma.js
```

## Usage

Paloma.js can be used in Node.js, as well as inside the browser.

### Create Wallet.. Connect already connected wallet.. Transfer between the 2.
```js
import { LCDClient, MsgSend, MnemonicKey } from '@palomachain/paloma.js';

const lcd = new LCDClient({
  URL: 'https://lcd.testnet.palomaswap.com',
  chainID: '< CHECK DOCS PAGE>',
  classic: true,
});

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'YOUR MNEMONIC HERE',
});

// get your wallet
const wallet = lcd.wallet(mk);

// create new wallet
const new_mk = new MnemonicKey();
const new_wallet = lcd.wallet(new_mk);

// check balance of your wallet
let address = wallet.key.accAddress;
let [balance] = await lcd.bank.balance(address);
console.log(balance.toData());

// check balance of new wallet
address = new_wallet.key.accAddress;
[balance] = await lcd.bank.balance(address);
console.log(balance.toData());


/// send 1000 grain from your wallet to new wallet
const send = new MsgSend(
  wallet.key.accAddress,
  new_wallet.key.accAddress,
  { ugrain: "1000" }
);

const tx = await wallet.createAndSignTx({ msgs: [send] });
const result = await lcd.tx.broadcast(tx);

// get and display balances after transfer
address = wallet.key.accAddress;
[balance] = await lcd.bank.balance(address);
console.log(balance.toData());

address = new_wallet.key.accAddress;
[balance] = await lcd.bank.balance(address);
console.log(balance.toData());

```

### Getting blockchain data
```ts
import { LCDClient, Coin } from '@palomachain/paloma.js';


const lcd = new LCDClient({
  URL: 'https://lcd.testnet.palomaswap.com',
  chainID: '< CHECK DOCS PAGE>',
  classic: true,
});



```

### Encrypt Key
```js
const crypt = new Crypt();
const encrypted_key_to_store = crypt.encrypt('KEY_VALUE', 'PASSWORD');

const key_value = crypt.decrypt(encrypted_key_to_store, 'PASSWORD');

```

### Broadcasting transactions


```ts
import { LCDClient, MsgSend, MnemonicKey } from '@palomachain/paloma.js';

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});


const lcd = new LCDClient({
  URL: 'https://lcd.testnet.palomaswap.com',
  chainID: '< CHECK DOCS PAGE>',
  classic: true,
});



// a wallet can be created out of any key
// wallets abstract transaction building
const wallet = lcd.wallet(mk);

// create a simple message that moves coin balances
const send = new MsgSend(
  'paloma1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'paloma17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
  { ugrain: 1000000 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from paloma.js!',
  })
  .then(tx => lcd.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });
```

## Paloma.js in the browser

You can access all the objects of the `@palomachain/paloma.js` from the global `Paloma` object if you load Paloma.js with a `<script>` tag.

Include the following in your browser:

```html
<script
  crossorigin
  src="https://unpkg.com/@palomachain/paloma.js/dist/bundle.js"
></script>
```


## Paloma.js in React Native

In order to use Paloma.js inside React Native, you need to add the [`node-libs-react-native`](https://github.com/parshap/node-libs-react-native) package and [`react-native-get-random-values`](https://github.com/LinusU/react-native-get-random-values) package to your React Native app's `package.json`.

```sh
yarn add node-libs-react-native react-native-get-random-values
```

You will need to register Node.js native modules in an entry point of your application, such as `index.tsx`:

```js
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
```

Also, add resolvers to your `metro.config.js`

```js
module.exports {
  // ...
  resolver: {
    // ...
    extraNodeModules: require('node-libs-react-native'),
  },
  // ...
}
```
