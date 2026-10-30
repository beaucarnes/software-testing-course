# TC-CAT-004: Filter Products by Category Dropdown

## Requirement ID
FR-PROD-004

## Module / Test type / Technique
Catalog / Functional / Decision Table

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Category Option 1 | "electronics" |
| Expected Categories 1 | Only "electronics" |
| Category Option 2 | "accessories" |
| Expected Categories 2 | Only "accessories" |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the category dropdown (`#categoryFilter`).
3. Select "Electronics" (`value="electronics"`).
4. Wait for the product grid to re-render.
5. Inspect the category label on each visible product card.
6. Select "Accessories" (`value="accessories"`).
7. Inspect the category label on each visible product card.
8. Select "All Categories" (`value="all"`).
9. Check total count of product cards.

## Expected result
- When "Electronics" is selected: only products in the electronics category are displayed; accessories products are hidden.
- When "Accessories" is selected: only products in the accessories category are displayed.
- When "All Categories" is selected: all 6 products are displayed again.

## Status / Related bugs
Not Run / None
