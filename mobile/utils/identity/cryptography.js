import * as ed from "@noble/ed25519";
import bs58 from "bs58";

const MULTICODEC_ED25519_PREFIX = new Uint8Array([0xed, 0x01]);

export async function generateDIDKey() {
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKey(privateKey);
  const multicodec = new Uint8Array(
    MULTICODEC_ED25519_PREFIX.length + publicKey.length,
  );
  multicodec.set(MULTICODEC_ED25519_PREFIX, 0);
  multicodec.set(publicKey, MULTICODEC_ED25519_PREFIX.length);
  const did = "did:key:z" + bs58.encode(multicodec);
  return {
    did,
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(privateKey).toString("hex"),
  };
}

export default generateDIDKey;
