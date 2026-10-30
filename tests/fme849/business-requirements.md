# Business Requirements Document (BRD) & Software Requirements Specification (SRS)
## TechMart Demo Store E-Commerce Application

- **Document Version:** 1.0.0
- **Application Name:** TechMart Demo Store (`sample-app`)
- **Status:** Approved / Baseline
- **Target Audience:** Product Managers, QA Engineers, Software Developers, Automation Testers
- **Base URL:** `http://localhost:3000`

---

## 1. Executive Summary & Objectives

### 1.1 Project Purpose
TechMart Demo Store is a lightweight, responsive e-commerce web application designed to demonstrate full-stack e-commerce capabilities and provide a robust benchmark platform for software testing (functional, non-functional, regression, Playwright automation, and AI-driven testing).

### 1.2 Business Goals
- **BG-001:** Provide an intuitive catalog browsing experience enabling users to discover and filter tech products quickly.
- **BG-002:** Enable seamless cart and checkout flows to maximize conversion and minimize checkout drop-offs.
- **BG-003:** Support secure user authentication and personalized shopping experiences with session state isolation.
- **BG-004:** Serve as a reference application adhering to modern web quality, accessibility (WCAG 2.0 AA), and security standards.

---

## 2. System Scope & Architecture

### 2.1 Scope
The system encompasses client-facing web storefront modules:
- Product Discovery & Catalog Browsing
- Shopping Cart Management
- User Account & Authentication
- Order Checkout & Inventory Allocation
- System Health & Monitoring

### 2.2 System Architecture
- **Backend:** Node.js + Express.js REST API service (`server.js`).
- **Data Persistence:** In-memory transactional data stores for products, users, and session states.
- **Session Management:** Cookie-based HTTP sessions (`sessionId` with `httpOnly: true`, `sameSite: 'lax'`).
- **Frontend:** Semantic HTML5, CSS3, vanilla ES6 JavaScript client application.

---

## 3. High-Level Business Requirements (BR)

| Requirement ID | Title | Description | Priority |
|---|---|---|---|
| **BR-CAT-001** | Product Catalog Browsing | The system shall present available products with real-time filtering, search, and sorting. | High |
| **BR-CAT-002** | Inventory Visibility | The system shall clearly communicate product stock levels and prevent overselling. | High |
| **BR-CRT-001** | Cart Operations | The system shall maintain persistent cart sessions allowing customers to add, modify, and remove products. | High |
| **BR-AUT-001** | User Identity & Access | The system shall support customer onboarding, secure authentication, and session persistence. | High |
| **BR-CHK-001** | Transactional Checkout | The system shall facilitate checkout by capturing shipping/payment details, reducing stock, and generating an order receipt. | Critical |
| **BR-SYS-001** | Platform Health & Reliability | The system shall expose health diagnostics and maintain high availability and performance. | Medium |

---

## 4. Business Rules & Operational Constraints

- **RULE-01 (Stock Enforcement):** Items with `stock = 0` cannot be added to cart. Adding items exceeding available stock must be rejected with HTTP 400.
- **RULE-02 (Price Precision):** All monetary values must be calculated and displayed to two decimal places (`$XX.XX`).
- **RULE-03 (Session Isolation):** Shopping carts and active logins are unique to each client session identified by `sessionId`.
- **RULE-04 (Account Uniqueness):** User email addresses must be unique. Registering with an existing email is prohibited.
- **RULE-05 (Inventory Deduction):** Upon successful checkout, product stock quantities are immediately deducted by the ordered amount, and the user's cart is cleared.

---

## 5. Functional Requirements (FR)

### 5.1 Module: Product Catalog & Discovery (`PROD`)

| Functional Req ID | Name | Description | Acceptance Standard |
|---|---|---|---|
| **FR-PROD-001** | Retrieve Product Catalog | `GET /api/products` returns list of all products. | Returns HTTP 200 with JSON array containing `id`, `name`, `price`, `category`, `image`, `stock`. |
| **FR-PROD-002** | Retrieve Single Product | `GET /api/products/:id` returns specific product by ID. | Returns HTTP 200 with product data; returns HTTP 404 `{ error: "Product not found" }` if invalid ID. |
| **FR-PROD-003** | Product Keyword Search | Search input on homepage filters displayed products by case-insensitive name match. | Supports partial match; shows empty message if no matches found; handles special characters gracefully. |
| **FR-PROD-004** | Category Filtering | Users can filter products by category (`all`, `electronics`, `accessories`). | Only items matching selected category are shown. |
| **FR-PROD-005** | Price Range Filtering | Max price slider filters items with `price <= maxPrice`. | Grid updates dynamically to reflect products within price threshold. |
| **FR-PROD-006** | Product Sorting | Users can sort products by Name (A-Z), Price: Low to High, Price: High to Low. | Grid re-renders in requested order without page reload. |
| **FR-PROD-007** | Stock Status Display | UI displays stock badge (`in stock`, `Only X left!` if stock < 5, `Out of Stock` with disabled button if stock == 0). | Status updates dynamically based on current inventory. |

### 5.2 Module: Shopping Cart (`CART`)

| Functional Req ID | Name | Description | Acceptance Standard |
|---|---|---|---|
| **FR-CART-001** | View Cart Contents | `GET /api/cart` retrieves current session items, joined product details, and total. | Returns HTTP 200 with `{ items: [...], total: "XX.XX" }`. |
| **FR-CART-002** | Add Item to Cart | `POST /api/cart` adds product (`productId`, `quantity`). | Adds new item or increments quantity; updates navbar cart count badge; returns HTTP 400 if quantity exceeds stock. |
| **FR-CART-003** | Update Item Quantity | `PUT /api/cart/:productId` updates quantity of existing cart item. | Quantity updated; if `quantity <= 0`, item is removed from cart; returns HTTP 404 if item not in cart. |
| **FR-CART-004** | Remove Item from Cart | `DELETE /api/cart/:productId` removes specific item. | Item removed from session cart; returns HTTP 200 with updated cart. |
| **FR-CART-005** | Clear Cart | `DELETE /api/cart` clears all items from session cart. | Cart becomes empty; returns HTTP 200 `{ message: "Cart cleared" }`. |
| **FR-CART-006** | Empty Cart UI State | Cart page displays friendly empty state when cart has 0 items. | Displays "Your cart is empty" message and "Start Shopping" button linking to homepage. |

### 5.3 Module: User Authentication & Profile (`AUTH`)

| Functional Req ID | Name | Description | Acceptance Standard |
|---|---|---|---|
| **FR-AUTH-001** | User Registration | `POST /api/register` creates new user account (`name`, `email`, `password`). | Returns HTTP 201 with user profile (excluding password); logs user in; rejects missing fields or duplicate email with HTTP 400. |
| **FR-AUTH-002** | User Login | `POST /api/login` authenticates user with `email` and `password`. | Returns HTTP 200 and assigns user to session; returns HTTP 401 `{ error: "Invalid credentials" }` on failure. |
| **FR-AUTH-003** | Default Demo Account | System provides pre-seeded demo account (`demo@techmart.com` / `demo123`). | Login succeeds immediately out-of-the-box. |
| **FR-AUTH-004** | Get Current User | `GET /api/user` returns profile of logged-in user. | Returns HTTP 200 with `{ id, email, name }`; returns HTTP 401 if unauthenticated. |
| **FR-AUTH-005** | User Logout | `POST /api/logout` clears current user from session. | Returns HTTP 200 `{ message: "Logged out" }`; UI updates header to show "Sign In" and "Register". |
| **FR-AUTH-006** | Header Auth State | Navigation bar reflects login state. | Logged in: shows "Hi, [Name]" and "Logout". Logged out: shows "Sign In" and "Register". |

### 5.4 Module: Checkout & Order Processing (`CHK`)

| Functional Req ID | Name | Description | Acceptance Standard |
|---|---|---|---|
| **FR-CHK-001** | Checkout Form Fields | Captures shipping (`firstName`, `lastName`, `address`, `city`, `state`, `zip`, `phone`) and payment details (`cardName`, `cardNumber`, `expDate`, `cvv`). | Form performs mandatory field validation before submission. |
| **FR-CHK-002** | Order Submission | `POST /api/checkout` places order with shipping payload. | Returns HTTP 200 with order confirmation `{ id, items, total, shipping, date }`. |
| **FR-CHK-003** | Empty Cart Prevention | Prohibits checkout when cart is empty. | Returns HTTP 400 `{ error: "Cart is empty" }`. |
| **FR-CHK-004** | Stock Deduction | On successful order, decrements product stock by purchased quantity. | Product inventory decreases permanently in memory. |
| **FR-CHK-005** | Order Receipt Modal | UI displays confirmation modal with unique Order ID and summary. | Modal appears on success with generated order reference number. |

### 5.5 Module: System Health & Utilities (`SYS`)

| Functional Req ID | Name | Description | Acceptance Standard |
|---|---|---|---|
| **FR-SYS-001** | Health Check Endpoint | `GET /api/health` reports service readiness. | Returns HTTP 200 `{ status: "healthy", timestamp: "..." }`. |
| **FR-SYS-002** | Static Asset Serving | Express serves static files from `public/`. | HTML, CSS, client scripts, SVG images serve with proper MIME types. |

---

## 6. Non-Functional Requirements (NFR)

### 6.1 Usability & Accessibility (`NFR-A11Y`)
- **NFR-A11Y-001:** All product and UI images must include meaningful `alt` attributes or fallback handlers (`onerror="this.src='images/placeholder.svg'"`).
- **NFR-A11Y-002:** All interactive form controls (`input`, `select`) must have associated `<label>` elements or descriptive `aria-label`/`placeholder` attributes.
- **NFR-A11Y-003:** Heading hierarchy (`<h1>` through `<h3>`) must follow a logical sequence on all pages.
- **NFR-A11Y-004:** Automated audits against WCAG 2.0 AA (via Axe Core) must yield 0 critical violations.

### 6.2 Security (`NFR-SEC`)
- **NFR-SEC-001:** Client session cookies must be protected with `httpOnly: true` and `sameSite: 'lax'`.
- **NFR-SEC-002:** Search fields, inputs, and URLs must resist Cross-Site Scripting (XSS) attacks; HTML inputs must be escaped or safely rendered via text nodes.
- **NFR-SEC-003:** Authentication endpoints must never expose plaintext passwords in API responses.

### 6.3 Performance & Reliability (`NFR-PERF`)
- **NFR-PERF-001:** API response time for local product retrieval and cart updates shall be under 200ms.
- **NFR-PERF-002:** The client interface must remain responsive and non-blocking during network latency.

### 6.4 Cross-Platform & Responsive Compatibility (`NFR-COMPAT`)
- **NFR-COMPAT-001:** The storefront layout must adapt responsively across desktop, tablet, and mobile viewport widths (375px to 1440px+).
- **NFR-COMPAT-002:** Fully operational on modern rendering engines: Chromium (Chrome, Edge), Gecko (Firefox), and WebKit (Safari, iOS Safari).
