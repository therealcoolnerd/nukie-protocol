import os
import sys
import re

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

from identity import generate_did_key


def test_generate_did_key_format():
    did = generate_did_key()
    assert did.startswith("did:key:z"), "DID should start with did:key:z"
    # Base58 characters only
    assert re.fullmatch(r"did:key:z[1-9A-HJ-NP-Za-km-z]+", did)


def test_generate_did_key_unique():
    did1 = generate_did_key()
    did2 = generate_did_key()
    assert did1 != did2, "Each call should generate a unique DID"
