# Nukie Protocol — Scroll Your Culture

**Welcome to the future of Diaspora social.** The goal of Nukie is to build a secure, AI-powered and decentralized platform for the global Black Diaspora. This project is developed openly and welcomes community participation.

---

## 🚧 Status

This project is under active development.

---

## 🤝 Contributing

We welcome forks, issues, and pull requests from anyone interested in improving the project. To get started:

1. Fork the repository on GitHub.
2. Create a new branch for your changes (`git checkout -b feature/my-feature`).
3. Commit and push your code.
4. Open a pull request describing your contribution.

---

## 🔒 Security

Please report any security vulnerabilities responsibly. See our [security policy](SECURITY.md) for instructions on how to submit a private report.

---

## 🚀 Project Kickoff

This repository uses a `pyproject.toml` configuration for packaging and
defines the `nukie-identity` CLI script there.

**Clone the repo:**

```sh
git clone git@github.com:YOUR-ORG/nukie-protocol.git
cd nukie-protocol
```

Install the project in editable mode using the configuration from
`pyproject.toml`:

```sh
pip install -e .
```

Install Node dependencies for formatting hooks:

```sh
npm install
```

To manually run Prettier and ESLint on staged files:

```sh
npx lint-staged
```

Husky's pre-commit hook runs this automatically on commit.

---

## Identity Module

The identity module provides a simple DID generator. After installing the
package (see the Project Kickoff section) you can run the `nukie-identity`
command to print a new `did:key` identifier:

```sh
nukie-identity
```

You can also generate a DID programmatically from the package API:

```python
from identity import generate_did_key

did = generate_did_key()
print(did)
```

For JavaScript projects the repository exposes a companion helper at
`src/utils/identity/cryptography.js`. It provides a `generateDIDKey()`
function that returns the DID string along with the hex-encoded public and
private keys:

```js
import { generateDIDKey } from "./src/utils/identity/cryptography";

async function demo() {
  const { did, publicKey, privateKey } = await generateDIDKey();
  console.log(did, publicKey, privateKey);
}
```

---

## Web Frontend Skeleton

The experimental Tkinter GUI has been replaced by a placeholder web frontend. To view it, serve the `web/` directory with any static file server, e.g.:

```sh
python -m http.server --directory web 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Mobile App (React Native + Expo)

The repository includes a basic React Native project inside the `mobile/` directory.
To try it out on Android:

1. Install Node.js and the Expo CLI globally:
   ```sh
   npm install -g expo-cli
   ```
2. Navigate to the new `mobile/` folder:
   ```sh
   cd mobile
   ```
3. Install dependencies and start the development server for Android:
   ```sh
   npm install --legacy-peer-deps
   # installs @noble/ed25519, bs58, buffer and react-native-get-random-values
   npx expo start
   ```
   The `--legacy-peer-deps` flag avoids peer dependency conflicts when installing packages. Running this command in `mobile/` installs all required packages, including `@babel/runtime`.

The `mobile/identity.js` helper exposes a new `generateDidKey()` function for
creating a persistent `did:key` identifier. Internally it stores the Ed25519
private key in [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/)
so the DID remains stable across app restarts. Import and call this function
anywhere in your React Native code to obtain the DID.

```js
import generateDidKey from "./identity";

async function setup() {
  const did = await generateDidKey();
  console.log("Your DID:", did);
}
```

Because the mobile build relies on libraries that expect Node's `Buffer` global,
`mobile/index.js` polyfills it by importing `buffer` and assigning
`global.Buffer`.

Android is the initial target platform.

---

## 🧪 Running Tests

Install the dependencies and run the full test suite using the `npm test`
command at the repository root. The `test` script is defined in
`package.json` as `pytest && cd mobile && npm test`, so it first runs the
Python tests via `pytest` and then executes the React Native Jest suite:

```sh
pip install -e .
pip install -r requirements.txt
cd mobile
npm install --legacy-peer-deps
cd ..
npm test
```
Using `--legacy-peer-deps` here prevents peer dependency conflicts during installation.
