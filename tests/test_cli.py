import subprocess


def test_cli_outputs_did_key():
    output = subprocess.check_output(['nukie-identity'], text=True).strip()
    assert output.startswith("did:key:z")

