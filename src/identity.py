"""Identity module for generating W3C DIDs using did:key."""

from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization
import base58

MULTICODEC_ED25519_PREFIX = b"\xed\x01"


def generate_did_key() -> str:
    """Generate a new did:key identifier."""
    private_key = ed25519.Ed25519PrivateKey.generate()
    public_key = private_key.public_key().public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw,
    )
    multicodec = MULTICODEC_ED25519_PREFIX + public_key
    did = "did:key:z" + base58.b58encode(multicodec).decode()
    return did


def main() -> None:
    """Console entrypoint for generating a new DID."""
    print(generate_did_key())

if __name__ == "__main__":
    main()
