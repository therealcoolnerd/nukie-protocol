import 'react-native-get-random-values';
import * as ed from "@noble/ed25519";
import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "nukie-private-key";
const MULTICODEC_ED25519_PREFIX = new Uint8Array([0xed, 0x01]);
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function base58Encode(bytes) {
  if (!bytes.length) return "";
  const digits = [0];
  for (let i = 0; i < bytes.length; ++i) {
    let carry = bytes[i];
    for (let j = 0; j < digits.length; ++j) {
      const x = digits[j] * 256 + carry;
      digits[j] = x % 58;
      carry = (x / 58) | 0;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let output = "";
  for (let k = 0; bytes[k] === 0 && k < bytes.length - 1; k++) {
    output += ALPHABET[0];
  }
  for (let q = digits.length - 1; q >= 0; q--) {
    output += ALPHABET[digits[q]];
  }
  return output;
}

export async function generateDidKey() {
  let privHex = await SecureStore.getItemAsync(STORAGE_KEY);
  let privBytes;
  if (!privHex) {
    privBytes = ed.utils.randomPrivateKey();
    privHex = ed.utils.bytesToHex(privBytes);
    await SecureStore.setItemAsync(STORAGE_KEY, privHex);
  } else {
    privBytes = ed.utils.hexToBytes(privHex);
  }
  const pubBytes = await ed.getPublicKey(privBytes);
  const multicodec = new Uint8Array(
    MULTICODEC_ED25519_PREFIX.length + pubBytes.length,
  );
  multicodec.set(MULTICODEC_ED25519_PREFIX, 0);
  multicodec.set(pubBytes, MULTICODEC_ED25519_PREFIX.length);
  return "did:key:z" + base58Encode(multicodec);
}

export default generateDidKey;
