import { LCDClient } from '../LCDClient';
import { WasmAPI } from './WasmAPI';

const paloma = new LCDClient({
  chainID: 'pisco-1',
  URL: 'http://rbox.palomachain.com:1317',
});
const wasm = new WasmAPI(paloma);

describe('WasmAPI', () => {
  it('parameters', async () => {
    if (paloma.config.isClassic) {
      // only classic network has param query
      await expect(wasm.parameters()).resolves.toMatchObject({
        max_contract_size: expect.any(Number),
        max_contract_gas: expect.any(Number),
        max_contract_msg_size: expect.any(Number),
      });
    }
  });

  it('code_info', async () => {
    // only classic network has param query
    await expect(wasm.codeInfo(1)).resolves.toMatchObject({
      code_id: 1,
      creator: 'paloma1nty4gn8k2nrewy26fm62v03322fxgpq0hxssn6',
      code_hash:
        '91F30D3537DAF107EF3CD3FBD81BF55178C366319F510135451890D4EEB11717',
      instantiate_permission: {
        permission: 3,
        address: '',
      },
    });
  });

  /* access denied
  it('all_codes', async () => {
    // only classic network has param query
    const [codes, _] = await wasm.allCodes();
    codes.forEach(code => {
      expect(code.code_id).toBeDefined();
      expect(code.code_hash).toBeDefined();
      expect(code.creator).toBeDefined();
    });
  });
  */
});
