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

**Clone the repo:**
```sh
git clone git@github.com:therealcoolnerd/nukie-protocol.git
cd nukie-protocol
```

---

## Identity Module

A simple DID generator is provided in `identity.py`. Run it to print a new `did:key` identifier:

```sh
python identity.py
```

---

## Web Frontend Skeleton

The experimental Tkinter GUI has been replaced by a placeholder web frontend. To view it, serve the `web/` directory with any static file server, e.g.:

```sh
python -m http.server --directory web 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🧪 Running Tests

Install the dependencies and run `pytest`:

```sh
pip install -r requirements.txt
pytest
```
