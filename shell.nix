{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    python3
    python3Packages.pip
    python3Packages.setuptools
    python3Packages.wheel
    python3Packages.cryptography
    python3Packages.base58
    python3Packages.pytest
    nodejs
  ];
  
  shellHook = ''
    echo "Nukie Protocol development environment ready!"
    echo "Python version: $(python3 --version)"
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
  '';
}