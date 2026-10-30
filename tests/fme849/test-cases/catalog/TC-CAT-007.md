# TC-CAT-007: Verify Stock Status Badges and Disabled Button on Out-of-Stock Items

## Requirement ID
FR-PROD-007

## Module / Test type / Technique
Catalog / Functional & GUI / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Application has products with varied stock levels (e.g. stock > 5, stock < 5, and stock == 0 via mock/data).

## Test data
| Product Stock Level | Expected Text / Status | Button State |
|---|---|---|
| stock = 15 | "15 in stock" | Enabled |
| stock = 4 | "Only 4 left!" (class `low`) | Enabled |
| stock = 0 | "Out of Stock" | Disabled (`disabled` attribute) |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Inspect product cards with normal stock (>= 5 units).
3. Verify the text reads "X in stock" with standard styling.
4. Inspect product cards with low stock (< 5 units).
5. Verify the text reads "Only X left!" and has class `low`.
6. Inspect product cards with 0 stock (e.g. mocked zero-stock product).
7. Verify the text reads "Out of Stock".
8. Verify that the "Add to Cart" button contains text "Out of Stock" and has the `disabled` attribute.

## Expected result
- Low-stock indicator is highlighted to warn customers.
- Out-of-stock items have disabled buttons that cannot be clicked to add items to cart.

## Status / Related bugs
Not Run / None
