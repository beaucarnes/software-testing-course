# TC-CHK-004: Verify Inventory Stock Deduction After Successful Checkout

## Requirement ID
FR-CHK-004

## Module / Test type / Technique
Checkout / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Record current stock of target product (e.g. "Wireless Headphones" id: 1) via `GET /api/products/1`.

## Test data
| Field | Value |
|---|---|
| Target Product | "Wireless Headphones" (ID: 1) |
| Order Quantity | 2 |
| Initial Stock | Stored value $S_0$ |
| Expected Post-Order Stock | $S_0 - 2$ |

## Test steps
1. Send `GET /api/products/1` and record initial `stock` ($S_0$).
2. Add 2 units of product 1 to the session cart.
3. Proceed to `/checkout.html` and fill in valid shipping and payment details.
4. Click "Place Order" and verify order confirmation appears.
5. Send `GET /api/products/1` to retrieve the updated product record.
6. Check product card stock label on the homepage (`/index.html`).

## Expected result
- API response for product 1 confirms stock is exactly $S_0 - 2$.
- Homepage product card reflects the decremented stock amount.
- Inventory is properly allocated without double-decrementing or data corruption.

## Status / Related bugs
Not Run / None
