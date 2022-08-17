import { LCDClient } from '../src';

const paloma = new LCDClient({
  chainID: 'bombay-12',
  URL: 'https://bombay-lcd.paloma.dev',
});

paloma.utils.validatorsWithVotingPower().then(x => console.log(x));
