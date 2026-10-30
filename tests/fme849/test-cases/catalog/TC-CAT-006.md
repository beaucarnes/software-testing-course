# TC-CAT-006: Sort Products by Price (Low to High and High to Low)

## Requirement ID
FR-PROD-006

## Module / Test type / Technique
Catalog / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage with all products loaded.

## Test data
| Field | Value |
|---|---|
| Sort Option 1 | "price-low" (Price: Low to High) |
| Sort Option 2 | "price-high" (Price: High to Low) |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the sort dropdown (`#sortBy`).
3. Select "Price: Low to High" (`price-low`).
4. Read the prices of all displayed products from top-to-bottom / left-to-right.
5. Verify that each product's price is greater than or equal to the preceding product's price.
6. Select "Price: High to Low" (`price-high`).
7. Read the prices of all displayed products.
8. Verify that each product's price is less than or equal to the preceding product's price.

## Expected result
- For "price-low": First product is the lowest priced ("Mouse Pad XL" at $24.99); last product is the highest priced ("Mechanical Keyboard" at $129.99).
- For "price-high": First product is the highest priced ($129.99); last product is the lowest priced ($24.99).
- Sorting happens instantly without requiring a full page refresh.

## Status / Related bugs
Not Run / None
