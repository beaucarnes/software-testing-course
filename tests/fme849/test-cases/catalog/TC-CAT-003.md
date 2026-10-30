# TC-CAT-003: Search Products with Non-Existent Keyword

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
| Search Input | "xyznonexistent123" |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the search input field (`#searchInput`).
3. Enter "xyznonexistent123".
4. Click the Search button (`#searchBtn`).
5. Observe the product grid area (`#productGrid`).

## Expected result
- 0 product cards are displayed in the grid.
- The grid displays the empty state message: "No products found matching your criteria."
- The page does not crash or throw unhandled JavaScript errors in the console.

## Status / Related bugs
Not Run / None
