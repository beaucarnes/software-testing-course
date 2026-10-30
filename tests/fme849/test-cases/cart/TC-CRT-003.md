# TC-CRT-003: View Cart Items and Verify Subtotal & Totals Calculation

## Requirement ID
FR-CART-001

## Module / Test type / Technique
Cart / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart is cleared (`DELETE /api/cart`).

## Test data
| Product Name | Unit Price | Quantity | Expected Line Total |
|---|---|---|---|
| "Wireless Headphones" | $79.99 | 1 | $79.99 |
| "USB-C Hub" | $49.99 | 1 | $49.99 |
| **Expected Subtotal** | | | **$129.98** |
| **Expected Total** | | | **$129.98** |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Find "Wireless Headphones" and click "Add to Cart".
3. Find "USB-C Hub" and click "Add to Cart".
4. Click the cart link in the navigation bar to go to `/cart.html`.
5. Verify both items appear in the cart list (`#cartItems`).
6. Verify unit price and line total for each item.
7. Verify subtotal element (`#subtotal`).
8. Verify total element (`#total`).

## Expected result
- Cart table displays 2 distinct items: Wireless Headphones ($79.99) and USB-C Hub ($49.99).
- Subtotal correctly displays "$129.98".
- Final total correctly displays "$129.98".
- "Proceed to Checkout" button is visible and active.

## Status / Related bugs
Not Run / None
