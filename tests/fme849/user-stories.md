# User Stories & Acceptance Criteria
## TechMart Demo Store E-Commerce Application

- **Document Version:** 1.0.0
- **Application Name:** TechMart Demo Store (`sample-app`)
- **Status:** Baseline / Approved
- **Mapped Specifications:** [business-requirements.md](./business-requirements.md)

---

## 1. Persona Definitions

| Persona | Role | Needs & Expectations |
|---|---|---|
| **Guest Shopper (Alex)** | First-time visitor without an account | Browses products, compares tech gear, adds items to cart, and wants effortless checkout without mandatory upfront registration. |
| **Registered Customer (Demo User)** | Returning customer with existing account | Logs in quickly, views personalized header greeting, retains cart items, and completes orders efficiently. |
| **Mobile Shopper (Taylor)** | User shopping via smartphone / tablet | Needs responsive, touch-friendly UI, legible fonts, accessible controls, and smooth mobile cart navigation. |

---

## 2. Epics & Story Index

- **Epic 1: Product Discovery & Catalog Browsing**
  - `US-CAT-001`: View Product Catalog & Inventory
  - `US-CAT-002`: Search Products by Keyword
  - `US-CAT-003`: Filter Products by Category
  - `US-CAT-004`: Filter Products by Price Threshold
  - `US-CAT-005`: Sort Products by Name and Price
- **Epic 2: Shopping Cart Management**
  - `US-CRT-001`: Add Products to Shopping Cart
  - `US-CRT-002`: View Cart & Real-Time Totals
  - `US-CRT-003`: Update Item Quantities in Cart
  - `US-CRT-004`: Remove Single Item from Cart
  - `US-CRT-005`: Clear Entire Shopping Cart
- **Epic 3: User Authentication & Account**
  - `US-AUT-001`: Customer Registration
  - `US-AUT-002`: Customer Login with Valid Credentials
  - `US-AUT-003`: Login Failure Handling & Error Messaging
  - `US-AUT-004`: User Logout & Session Termination
  - `US-AUT-005`: Header Authentication Status Display
- **Epic 4: Checkout & Order Completion**
  - `US-CHK-001`: Complete Multi-Field Checkout
  - `US-CHK-002`: Checkout Form Validation & Empty Cart Guard
  - `US-CHK-003`: Order Confirmation & Stock Deduction
- **Epic 5: Quality, Usability & Accessibility**
  - `US-A11Y-001`: Accessible Web Navigation & Screen Reader Support
  - `US-A11Y-002`: Responsive Experience Across Devices

---

## 3. Detailed User Stories

### Epic 1: Product Discovery & Catalog Browsing

#### `US-CAT-001`: View Product Catalog & Inventory
- **Role:** As a **Guest Shopper**
- **Action:** I want to view a grid of all available tech products with their images, names, prices, and stock indicators
- **Benefit:** So that I can browse available items and make informed purchasing decisions.
- **Priority:** Must Have (High)
- **Traceability:** `BR-CAT-001`, `BR-CAT-002`, `FR-PROD-001`, `FR-PROD-007`
- **Acceptance Criteria:**
  - **Scenario 1: Homepage loads products**
    - *Given* I navigate to `http://localhost:3000`
    - *When* the page completes loading
    - *Then* at least 6 product cards are visible in `#productGrid`
    - *And* each card displays an image, title, category, formatted price (`$XX.XX`), stock status, and an "Add to Cart" button.
  - **Scenario 2: Low stock and out-of-stock badges**
    - *Given* a product has stock between 1 and 4
    - *Then* the card displays "Only X left!" in highlighted text
    - *And* if stock is 0, the card shows "Out of Stock" and the "Add to Cart" button is disabled.

---

#### `US-CAT-002`: Search Products by Keyword
- **Role:** As a **Shopper**
- **Action:** I want to type a product keyword into the search bar and submit
- **Benefit:** So that I can quickly find the exact tech gadget I am looking for.
- **Priority:** High
- **Traceability:** `BR-CAT-001`, `FR-PROD-003`
- **Acceptance Criteria:**
  - **Scenario 1: Valid keyword search**
    - *Given* I am on the homepage
    - *When* I enter "Keyboard" in the search input and click Search
    - *Then* only products matching "Keyboard" (e.g. "Mechanical Keyboard") are displayed in the grid.
  - **Scenario 2: Search with no matching items**
    - *Given* I am on the homepage
    - *When* I search for "xyznonexistent123"
    - *Then* 0 product cards are displayed
    - *And* a message "No products found matching your criteria." is shown.
  - **Scenario 3: Empty and special character search**
    - *Given* I am on the homepage
    - *When* I search with an empty string, whitespace, or `<script>alert(1)</script>`
    - *Then* the application handles the query safely without crashing or executing script tags.

---

#### `US-CAT-003`: Filter Products by Category
- **Role:** As a **Shopper**
- **Action:** I want to choose a category from the dropdown menu (e.g. "Electronics" or "Accessories")
- **Benefit:** So that I only view products relevant to my interest.
- **Priority:** High
- **Traceability:** `BR-CAT-001`, `FR-PROD-004`
- **Acceptance Criteria:**
  - **Scenario 1: Filter by category**
    - *Given* the homepage is loaded with all products
    - *When* I select "Electronics" from `#categoryFilter`
    - *Then* all displayed products belong to the "electronics" category
    - *And* products belonging to "accessories" are hidden from the grid.
  - **Scenario 2: Reset to All categories**
    - *Given* the category filter is set to "Electronics"
    - *When* I select "All Categories"
    - *Then* all products from every category are displayed.

---

#### `US-CAT-004`: Filter Products by Price Threshold
- **Role:** As a **Budget-conscious Shopper**
- **Action:** I want to adjust the maximum price slider
- **Benefit:** So that I only see products within my budget.
- **Priority:** Medium
- **Traceability:** `BR-CAT-001`, `FR-PROD-005`
- **Acceptance Criteria:**
  - **Scenario 1: Adjust max price**
    - *Given* the price slider is visible on the homepage
    - *When* I adjust the slider to `$50`
    - *Then* only products priced at `$50.00` or less are visible
    - *And* products priced above `$50.00` (e.g. Mechanical Keyboard at $129.99) are excluded.

---

#### `US-CAT-005`: Sort Products by Name and Price
- **Role:** As a **Shopper**
- **Action:** I want to sort the product listing by Name (A-Z), Price (Low to High), and Price (High to Low)
- **Benefit:** So that I can evaluate items based on my preferred ordering criteria.
- **Priority:** Medium
- **Traceability:** `BR-CAT-001`, `FR-PROD-006`
- **Acceptance Criteria:**
  - **Scenario 1: Sort by Price: Low to High**
    - *When* I select "Price: Low to High" from `#sortBy`
    - *Then* products are sorted in ascending price order (cheapest first).
  - **Scenario 2: Sort by Price: High to Low**
    - *When* I select "Price: High to Low" from `#sortBy`
    - *Then* products are sorted in descending price order (most expensive first).

---

### Epic 2: Shopping Cart Management

#### `US-CRT-001`: Add Products to Shopping Cart
- **Role:** As a **Shopper**
- **Action:** I want to click "Add to Cart" on a product card
- **Benefit:** So that the selected item is saved to my shopping session for later checkout.
- **Priority:** Must Have (High)
- **Traceability:** `BR-CRT-001`, `RULE-01`, `FR-CART-002`
- **Acceptance Criteria:**
  - **Scenario 1: Add item successfully**
    - *Given* I am viewing a product with stock > 0
    - *When* I click "Add to Cart"
    - *Then* a toast notification appears stating "Added to cart"
    - *And* the cart badge counter in the navbar increments by 1.
  - **Scenario 2: Add same item repeatedly**
    - *Given* product A is already in my cart with quantity 1
    - *When* I click "Add to Cart" on product A again
    - *Then* product A's quantity in the cart increments to 2
    - *And* the cart item count in the navbar updates accordingly.

---

#### `US-CRT-002`: View Cart & Real-Time Totals
- **Role:** As a **Shopper**
- **Action:** I want to open `/cart.html` to review all added items, quantities, and price totals
- **Benefit:** So that I can verify my order details before proceeding to payment.
- **Priority:** Must Have (High)
- **Traceability:** `BR-CRT-001`, `RULE-02`, `FR-CART-001`
- **Acceptance Criteria:**
  - **Scenario 1: View cart items and subtotal**
    - *Given* I added "Wireless Headphones" ($79.99) and "USB-C Hub" ($49.99) to my cart
    - *When* I navigate to `/cart.html`
    - *Then* both items appear in the cart list with correct thumbnails, titles, unit prices, and quantities
    - *And* the subtotal and total display `$129.98`.
  - **Scenario 2: Empty cart state**
    - *Given* my cart contains 0 items
    - *When* I navigate to `/cart.html`
    - *Then* I see the message "Your cart is empty"
    - *And* a "Start Shopping" button is displayed linking to `/index.html`.

---

#### `US-CRT-003`: Update Item Quantities in Cart
- **Role:** As a **Shopper**
- **Action:** I want to click the `+` or `-` buttons next to a cart item
- **Benefit:** So that I can adjust the quantity I wish to purchase.
- **Priority:** High
- **Traceability:** `BR-CRT-001`, `FR-CART-003`
- **Acceptance Criteria:**
  - **Scenario 1: Increase quantity**
    - *Given* an item is in the cart with quantity 1
    - *When* I click the `+` button
    - *Then* the quantity increases to 2
    - *And* the item subtotal and overall cart total recalculate immediately.
  - **Scenario 2: Decrease quantity to zero**
    - *Given* an item is in the cart with quantity 1
    - *When* I click the `-` button
    - *Then* the item is removed from the cart.

---

#### `US-CRT-004`: Remove Single Item from Cart
- **Role:** As a **Shopper**
- **Action:** I want to click the remove button (`✕`) on a cart row
- **Benefit:** So that I can delete an item I no longer intend to buy.
- **Priority:** High
- **Traceability:** `BR-CRT-001`, `FR-CART-004`
- **Acceptance Criteria:**
  - **Scenario 1: Remove item**
    - *Given* I have multiple items in the cart
    - *When* I click the `✕` remove button on item A
    - *Then* item A is removed from the cart table
    - *And* the cart total and navbar badge update immediately.

---

#### `US-CRT-005`: Clear Entire Shopping Cart
- **Role:** As a **Shopper**
- **Action:** I want an option or API command to clear all cart contents
- **Benefit:** So that I can reset my shopping cart in one step.
- **Priority:** Medium
- **Traceability:** `BR-CRT-001`, `FR-CART-005`, `FR-CART-006`
- **Acceptance Criteria:**
  - **Scenario 1: Clear cart endpoint**
    - *Given* items exist in the session cart
    - *When* `DELETE /api/cart` is invoked
    - *Then* the cart items array is emptied
    - *And* subsequent cart fetches return `{ items: [], total: "0.00" }`.

---

### Epic 3: User Authentication & Account

#### `US-AUT-001`: Customer Registration
- **Role:** As a **New Customer**
- **Action:** I want to create an account by providing my Full Name, Email, Password, and Password Confirmation
- **Benefit:** So that I can have an identity on TechMart.
- **Priority:** High
- **Traceability:** `BR-AUT-001`, `RULE-04`, `FR-AUTH-001`
- **Acceptance Criteria:**
  - **Scenario 1: Successful registration**
    - *Given* I am on `/register.html`
    - *When* I submit valid Name, an unused Email, and matching Passwords
    - *Then* a success notification appears
    - *And* I am logged in and redirected to `/index.html` with my name shown in the navbar.
  - **Scenario 2: Password mismatch**
    - *Given* I enter "password123" and confirm with "different456"
    - *When* I click "Create Account"
    - *Then* an error message "Passwords do not match" is displayed
    - *And* no account is created.
  - **Scenario 3: Duplicate email**
    - *Given* an account with `demo@techmart.com` already exists
    - *When* I try to register with `demo@techmart.com`
    - *Then* the API returns HTTP 400 `{ error: "Email already registered" }`.

---

#### `US-AUT-002`: Customer Login with Valid Credentials
- **Role:** As a **Returning Customer**
- **Action:** I want to log in using my email and password
- **Benefit:** So that I can access my session and complete my purchases.
- **Priority:** Must Have (High)
- **Traceability:** `BR-AUT-001`, `FR-AUTH-002`, `FR-AUTH-003`
- **Acceptance Criteria:**
  - **Scenario 1: Demo account login**
    - *Given* I am on `/login.html`
    - *When* I enter `demo@techmart.com` and `demo123` and click "Login"
    - *Then* I am redirected to `/index.html`
    - *And* the navbar displays "Hi, Demo User" and a "Logout" button.

---

#### `US-AUT-003`: Login Failure Handling & Error Messaging
- **Role:** As a **Customer**
- **Action:** I want clear error feedback when I enter incorrect credentials
- **Benefit:** So that I understand why login failed and can re-try.
- **Priority:** High
- **Traceability:** `BR-AUT-001`, `FR-AUTH-002`
- **Acceptance Criteria:**
  - **Scenario 1: Wrong password**
    - *Given* I am on `/login.html`
    - *When* I enter `demo@techmart.com` with `wrongpassword`
    - *Then* an error toast/message "Invalid credentials" is displayed
    - *And* I remain on `/login.html`.

---

#### `US-AUT-004`: User Logout & Session Termination
- **Role:** As a **Logged-in Customer**
- **Action:** I want to click the "Logout" button
- **Benefit:** So that my user session is securely terminated on shared devices.
- **Priority:** High
- **Traceability:** `BR-AUT-001`, `FR-AUTH-005`
- **Acceptance Criteria:**
  - **Scenario 1: Logout**
    - *Given* I am logged in with "Hi, Demo User" visible
    - *When* I click "Logout"
    - *Then* the session user is cleared
    - *And* the header updates to show "Sign In" and "Register" buttons.

---

#### `US-AUT-005`: Header Authentication Status Display
- **Role:** As a **Shopper**
- **Action:** I want the header to always display my current authentication state
- **Benefit:** So that I know immediately whether I am logged in or a guest.
- **Priority:** Medium
- **Traceability:** `FR-AUTH-004`, `FR-AUTH-006`
- **Acceptance Criteria:**
  - **Scenario 1: Logged-in state**
    - *Given* `GET /api/user` returns HTTP 200 `{ name: "Demo User" }`
    - *Then* `#authArea` renders "Hi, Demo User" and `<button id="logoutBtn">Logout</button>`.
  - **Scenario 2: Logged-out state**
    - *Given* `GET /api/user` returns HTTP 401
    - *Then* `#authArea` renders links to `/login.html` and `/register.html`.

---

### Epic 4: Checkout & Order Completion

#### `US-CHK-001`: Complete Multi-Field Checkout
- **Role:** As a **Shopper with items in cart**
- **Action:** I want to fill in my shipping and payment information on `/checkout.html` and click "Place Order"
- **Benefit:** So that my order is processed and confirmed.
- **Priority:** Critical (Must Have)
- **Traceability:** `BR-CHK-001`, `FR-CHK-001`, `FR-CHK-002`
- **Acceptance Criteria:**
  - **Scenario 1: Valid checkout flow**
    - *Given* I have items in my cart and navigate to `/checkout.html`
    - *When* I fill in First Name, Last Name, Address, City, State, ZIP, Phone, Cardholder Name, Card Number, Expiration Date, CVV
    - *And* I click "Place Order"
    - *Then* the order is processed successfully
    - *And* an order confirmation modal appears showing "Order Confirmed" with an Order ID.

---

#### `US-CHK-002`: Checkout Form Validation & Empty Cart Guard
- **Role:** As a **System / QA Auditor**
- **Action:** I want the checkout process to reject empty carts and incomplete shipping data
- **Benefit:** So that invalid or unfilled orders cannot be created.
- **Priority:** High
- **Traceability:** `BR-CHK-001`, `FR-CHK-003`
- **Acceptance Criteria:**
  - **Scenario 1: Checkout with empty cart**
    - *Given* my cart is empty
    - *When* a `POST /api/checkout` request is sent
    - *Then* the server responds with HTTP 400 `{ error: "Cart is empty" }`.
  - **Scenario 2: Missing required shipping fields**
    - *Given* items are in the cart
    - *When* I omit required shipping fields (address, city, or zip)
    - *Then* the server returns HTTP 400 `{ error: "Shipping information required" }`.

---

#### `US-CHK-003`: Order Confirmation & Stock Deduction
- **Role:** As a **Store Operator & Shopper**
- **Action:** I want the system to deduct ordered quantities from inventory and empty the cart upon order placement
- **Benefit:** So that inventory remains accurate and prevents double-purchasing.
- **Priority:** Critical
- **Traceability:** `BR-CAT-002`, `RULE-05`, `FR-CHK-004`
- **Acceptance Criteria:**
  - **Scenario 1: Stock deduction and cart reset**
    - *Given* Product A has stock of 15
    - *When* a customer places an order for 2 units of Product A
    - *Then* Product A's stock decreases to 13
    - *And* the customer's session cart is cleared (`items.length === 0`).

---

### Epic 5: Quality, Usability & Accessibility

#### `US-A11Y-001`: Accessible Web Navigation & Screen Reader Support
- **Role:** As a **User with assistive technologies**
- **Action:** I want proper image alternative text, labeled form controls, and structured headings
- **Benefit:** So that I can navigate and purchase products using screen readers and keyboard navigation.
- **Priority:** High
- **Traceability:** `NFR-A11Y-001` through `NFR-A11Y-004`
- **Acceptance Criteria:**
  - **Scenario 1: All images have alt attributes**
    - *Given* any page in TechMart
    - *Then* every `<img>` tag contains a non-empty `alt` attribute.
  - **Scenario 2: Form controls have labels**
    - *Given* any form on login, register, or checkout pages
    - *Then* all inputs have corresponding `<label for="...">` elements or valid `aria-label`/`placeholder` attributes.
  - **Scenario 3: Zero critical accessibility violations**
    - *Given* automated Axe Core auditing on the homepage
    - *Then* 0 critical WCAG 2.0 AA violations are detected.

---

#### `US-A11Y-002`: Responsive Experience Across Devices
- **Role:** As a **Mobile Shopper**
- **Action:** I want the storefront to adapt fluidly to small screen widths
- **Benefit:** So that I have an optimal shopping experience on mobile devices.
- **Priority:** High
- **Traceability:** `NFR-COMPAT-001`
- **Acceptance Criteria:**
  - **Scenario 1: Mobile viewport rendering**
    - *Given* a viewport width of 375px (e.g. iPhone)
    - *When* I view the homepage, cart, or checkout
    - *Then* no horizontal page overflow occurs
    - *And* product cards, navigation, and buttons remain fully clickable and readable.
