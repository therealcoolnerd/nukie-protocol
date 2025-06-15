from setuptools import setup


setup(
    name="nukie-protocol",
    version="0.1.0",
    package_dir={"": "src"},
    py_modules=["identity"],
    install_requires=["cryptography", "base58"],
    entry_points={"console_scripts": ["nukie-identity=identity:main"]},
)
