# TechMart Requirements & User Stories (`fme849`)

This folder contains the complete formal requirement specifications and agile user stories for the **TechMart Demo Store** (`sample-app`).

## Documentation Index

| File | Type | Description |
|---|---|---|
| [**`business-requirements.md`**](./business-requirements.md) | BRD / SRS | Comprehensive Business Requirements Document & Software Requirements Specification. Contains business goals, operational rules, functional requirements (`FR-*`), and non-functional requirements (`NFR-*`). |
| [**`user-stories.md`**](./user-stories.md) | Agile User Stories | Persona definitions, 5 Epics, 17 User Stories (`US-*`) with Gherkin acceptance criteria (`Given - When - Then`) and traceability mappings. |
| [**`test-cases/`**](./test-cases/) | E2E Test Cases | 29 detailed test cases formatted to standard QA templates, categorized across 6 module directories (`catalog/`, `cart/`, `auth/`, `checkout/`, `accessibility/`, `edge-cases/`). |
| [**`test-scripts/`**](./test-scripts/) | Playwright Automation Tests | Automated test suite implementation using Page Object Model (POM), Playwright auto-waiting, resilient locators, Trace Viewer, and video on failure. All 29 tests verified passing. |

---

## Traceability ID Convention Summary

| Prefix | Domain | Description | Example |
|---|---|---|---|
| `BR-` | Business Requirement | High-level business capability | `BR-CAT-001`, `BR-CHK-001` |
| `FR-` | Functional Requirement | Detailed system functionality | `FR-PROD-001`, `FR-CART-002`, `FR-AUTH-001` |
| `NFR-` | Non-Functional Requirement | Quality attributes (a11y, security, performance) | `NFR-A11Y-001`, `NFR-SEC-001` |
| `US-` | User Story | Agile story with persona & acceptance criteria | `US-CAT-001`, `US-CRT-002`, `US-CHK-001` |
| `TC-` | Test Case | Standardized executable test case | `TC-CAT-001`, `TC-CRT-003`, `TC-CHK-001` |
| `RULE-` | Business Rule | Explicit operational/data constraints | `RULE-01` (Stock enforcement), `RULE-05` (Stock decrement) |

---

## Module Coverage Mapping

```
sample-app/
├── server.js               <--> FR-PROD-*, FR-CART-*, FR-AUTH-*, FR-CHK-*, FR-SYS-*
└── public/
    ├── index.html / app.js <--> US-CAT-*, US-A11Y-*, TC-CAT-*, TC-A11Y-*, TC-EDGE-*
    ├── cart.html / app.js  <--> US-CRT-*, TC-CRT-* (Cart Viewing, Item Updates, Clear Cart)
    ├── login.html          <--> US-AUT-002, US-AUT-003, TC-AUTH-004, TC-AUTH-005
    ├── register.html       <--> US-AUT-001, TC-AUTH-001, TC-AUTH-002, TC-AUTH-003
    └── checkout.html       <--> US-CHK-*, TC-CHK-* (Order Form, Validation, Confirmation)
```
