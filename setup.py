from setuptools import setup

setup(
    name="nukie-protocol",
    version="0.1.0",
    py_modules=["identity"],
    install_requires=["cryptography", "base58"],
)
