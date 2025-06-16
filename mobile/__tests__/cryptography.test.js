import { generateDIDKey } from '../../src/utils/identity/cryptography';
import * as ed from '@noble/ed25519';

beforeAll(() => {
  const crypto = require('crypto');
  ed.etc.sha512Sync = (...msgs) => {
    const hash = crypto.createHash('sha512');
    for (const m of msgs) hash.update(Buffer.from(m));
    return new Uint8Array(hash.digest());
  };
});

describe('generateDIDKey', () => {
  test('returns valid did:key and hex keys', async () => {
    const { did, privateKey, publicKey } = await generateDIDKey();
    expect(did).toMatch(/^did:key:z[1-9A-HJ-NP-Za-km-z]+$/);
    expect(privateKey).toMatch(/^[0-9a-f]{64}$/);
    expect(publicKey).toMatch(/^[0-9a-f]{64}$/);
  });
});
