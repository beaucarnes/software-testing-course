# TC-CAT-002: Search Products by Valid Keyword

## Requirement ID
FR-PROD-003

## Module / Test type / Technique
Catalog / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Search Input | "Keyboard" |
| Expected Product Name | "Mechanical Keyboard" |
| Expected Product Price | "$129.99" |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the search input field (`#searchInput`).
3. Type "Keyboard" into the search field.
4. Click the Search button (`#searchBtn`).
5. Wait for the product grid to update.
6. Verify the number of displayed products and the details of the returned card.

## Expected result
- Only 1 product card is displayed in `#productGrid`.
- The product title displays "Mechanical Keyboard".
- The product price displays "$129.99".
- Unrelated products are filtered out of view.

## Status / Related bugs
Not Run / None
