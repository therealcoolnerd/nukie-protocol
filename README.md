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
   npm install
   npx expo start
   ```

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

Android is the initial target platform.

---

## 🧪 Running Tests

Install the dependencies and run `pytest` for the Python modules. If you have
Node.js installed you can also execute the React Native Jest suite:

```sh
pip install -e .
pip install -r requirements.txt
pytest
```
```sh
cd mobile
npm install
npm test
```
