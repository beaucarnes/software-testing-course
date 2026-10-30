# TC-CAT-001: Verify Homepage Loads and Displays Product Cards

## Requirement ID
FR-PROD-001

## Module / Test type / Technique
Catalog / GUI & Functional / Checklist

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Browser has clear cookies and session state.

## Test data
| Field | Value |
|---|---|
| Target URL | `http://localhost:3000/` |
| Expected Product Count | 6 |

## Test steps
1. Open the browser and navigate to `http://localhost:3000/`.
2. Observe page title in the browser tab.
3. Check header logo and navbar elements.
4. Verify hero title and subtitle text.
5. Inspect the product catalog grid (`#productGrid`).
6. Verify individual product card elements (image, name, price, stock status, "Add to Cart" button).

## Expected result
- Page title contains "TechMart".
- Navbar displays the logo with text "TechMart".
- Hero section displays heading "Welcome to TechMart" and description text.
- Product grid displays 6 product cards.
- Each product card contains a product image, heading title, category, formatted price (`$XX.XX`), stock status, and an enabled "Add to Cart" button.

## Status / Related bugs
Not Run / None
