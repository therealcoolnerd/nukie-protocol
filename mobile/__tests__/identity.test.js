import generateDidKey, { base58Encode } from '../identity';
import * as SecureStore from 'expo-secure-store';
import * as ed from '@noble/ed25519';
jest.mock('expo-secure-store', () => ({ getItemAsync: jest.fn(), setItemAsync: jest.fn() }));
describe('generateDidKey', () => {
  const STORAGE_KEY = 'nukie-private-key';
  const MULTICODEC_ED25519_PREFIX = new Uint8Array([0xed, 0x01]);
  beforeAll(() => {
    ed.utils.bytesToHex = (b) => Buffer.from(b).toString("hex");
    const crypto = require("crypto");
    ed.etc.sha512Sync = (...msgs) => {
      const hash = crypto.createHash("sha512");
      for (const m of msgs) hash.update(Buffer.from(m));
      return new Uint8Array(hash.digest());
    };
    ed.utils.hexToBytes = (h) => Uint8Array.from(Buffer.from(h, "hex"));
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('generates new key and stores it if none exists', async () => {
    const priv = Uint8Array.from([...Array(32).keys()]);
    jest.spyOn(ed.utils, 'randomPrivateKey').mockReturnValue(priv);

    SecureStore.getItemAsync.mockResolvedValueOnce(null);
    SecureStore.setItemAsync.mockResolvedValueOnce();

    const did = await generateDidKey();

    const privHex = ed.utils.bytesToHex(priv);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(STORAGE_KEY, privHex);

    const pub = await ed.getPublicKey(priv);
    const multicodec = new Uint8Array(MULTICODEC_ED25519_PREFIX.length + pub.length);
    multicodec.set(MULTICODEC_ED25519_PREFIX, 0);
    multicodec.set(pub, MULTICODEC_ED25519_PREFIX.length);
    const expected = 'did:key:z' + base58Encode(multicodec);
    expect(did).toBe(expected);
  });

  test('reuses stored key if available', async () => {
    const priv = Uint8Array.from([...Array(32).keys()]);
    const privHex = ed.utils.bytesToHex(priv);
    SecureStore.getItemAsync.mockResolvedValueOnce(privHex);

    const did = await generateDidKey();

    expect(SecureStore.setItemAsync).not.toHaveBeenCalled();

    const pub = await ed.getPublicKey(priv);
    const multicodec = new Uint8Array(MULTICODEC_ED25519_PREFIX.length + pub.length);
    multicodec.set(MULTICODEC_ED25519_PREFIX, 0);
    multicodec.set(pub, MULTICODEC_ED25519_PREFIX.length);
    const expected = 'did:key:z' + base58Encode(multicodec);
    expect(did).toBe(expected);
  });
});
