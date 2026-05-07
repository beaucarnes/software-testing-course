# Software Testing Workspace

This repository contains a sample e-commerce web application and two test suites for validating its behavior:

- `sample-app/` — TechMart demo store built with Node.js and Express
- `tests/traditional/` — Playwright test suite for end-to-end and API testing
- `tests/selenium/` — Selenium/Mocha test suite for browser-based automation and accessibility checks

## Repository Structure

```
sample-app/
  package.json
  server.js
  public/
    app.js
    cart.html
    checkout.html
    index.html
    login.html
    register.html
    styles.css
    images/
tests/
  traditional/
    package.json
    playwright.config.js
    tests/
      accessibility.spec.js
      api.spec.js
      auth.spec.js
      cart.spec.js
      checkout.spec.js
      edge-cases.spec.js
      homepage.spec.js
      mocking.spec.js
      axe.spec.js
```

## Prerequisites

- Node.js `>=18` recommended
- npm
- Git (optional, for cloning the repository)

## Setup

### 1. Install dependencies for the sample app

```bash
cd sample-app
npm install
```

### 2. Install dependencies for the traditional Playwright suite

```bash
cd ../tests/traditional
npm install
```

## Running the Sample App

From `sample-app/`:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Running Tests

### Traditional Playwright Suite

From `tests/traditional/`:

```bash
npm test
```

Available commands:

- `npm test` — run the full Playwright suite
- `npm run test:headed` — run tests with visible browser windows
- `npm run test:ui` — open the Playwright test runner UI
- `npm run test:report` — display the Playwright HTML report

> Playwright is configured to start the sample app automatically using the `webServer` setting in `playwright.config.js`.


## Sample App Details

The sample app implements the following API endpoints:

### Products
- `GET /api/products` — return all products
- `GET /api/products?category=...&search=...&minPrice=...&maxPrice=...` — filter products
- `GET /api/products/:id` — return a product by ID

### Cart
- `GET /api/cart` — get current cart contents
- `POST /api/cart` — add a product to the cart
- `PUT /api/cart/:productId` — update cart item quantity
- `DELETE /api/cart/:productId` — remove a product from cart
- `DELETE /api/cart` — clear the cart

### Authentication
- `POST /api/login` — login with email and password
- `POST /api/register` — register a new user
- `POST /api/logout` — log out current session
- `GET /api/user` — get current user details

### Checkout
- `POST /api/checkout` — place an order with shipping details

### Health
- `GET /api/health` — check server health status

## Known Demo Credentials

- Email: `demo@techmart.com`
- Password: `demo123`

## Notes

- The sample app uses in-memory storage for products, sessions, carts, and users, so data resets on server restart.
- The Playwright suite runs tests serially (`workers: 1`) for consistent state because the demo app uses in-memory session data.
- If you want to inspect the sample application UI manually, start the app and navigate to `http://localhost:3000`.

## Additional Documentation

A more concise app-specific README is available in `sample-app/README.md`, including a summary of API endpoints and demo user credentials.

## Troubleshooting

- If the Playwright suite fails because the server cannot start, verify `sample-app` dependencies are installed and that port `3000` is free.
