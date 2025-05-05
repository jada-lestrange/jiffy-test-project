# 🧪 Playwright E2E Tests for JiffyProject

This project contains end-to-end tests written in [Playwright](https://playwright.dev/) with TypeScript, structured using Nx.

---

## 📂 Project Structure

- `libs/pages` - Main reference library containing `.ts` Page Objects describing the app elements structured by screens
- `libs/test-data` - Reusable test data modules
- `libs/clients` - API clients (to be added if needed)
- `tests/` — Main directory containing Playwright `.spec.ts` test files
- `playwright.config.ts` — Playwright configuration file
- `project.json` — Nx project definition for the `tests` project
- `package.json` — Scripts for running tests
---

## 🚀 How to Run the Tests

### ▶️ Option 1: Run from WebStorm

You can click the green **Run Test** button next to any test block (as shown below):

```ts
test('Add several products to the cart from product profile', async () => {
  ...
});
```

### ▶️ Option 2: Run using pre-defined scripts with Nx

You can run all tests from the terminal using the predefined scripts located in package.json. 

I recommend using the e2e:ui version that opens a Playwright UI for clear view and debugging

    "e2e": "npx nx run-many --target=e2e --projects=tests --skip-nx-cache",
    "e2e:ui": "npx nx run-many --target=e2e --projects=tests --ui --skip-nx-cache" 

## 🛠 Prerequisites

Node.js (v18+ recommended)

Installed dependencies:

npm install

npx playwright install


## 🧩 Libraries

The libs/src/ directory is organized to keep code modular and reusable:

 - pages/: Implements the Page Object Model (POM) pattern for each part of the UI (landing, product, cart, etc.)

- test-data/: Holds reusable test input such as user data or UI constants

These are imported by the .spec.ts tests to keep them clean and maintainable.

## 📁 Reports
After each test run, Playwright will generate:

- playwright-report/: Viewable via npx playwright show-report

- test-results/: Raw assets including screenshots, videos, and traces

## ✍️ Author
Maintained by Marina Tokar (GitHub @jada-lestrange)