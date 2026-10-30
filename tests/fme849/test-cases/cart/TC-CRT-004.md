# TC-CRT-004: Increase and Decrease Item Quantity on Cart Page

## Requirement ID
FR-CART-003

## Module / Test type / Technique
Cart / Functional / Boundary Value Analysis

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart contains 1 item ("Wireless Headphones", price: $79.99, quantity: 1).
- User is on the cart page (`/cart.html`).

## Test data
| Action | Initial Qty | Target Qty | Expected Item Total | Expected Subtotal |
|---|---|---|---|---|
| Click `+` button | 1 | 2 | $159.98 | $159.98 |
| Click `-` button | 2 | 1 | $79.99 | $79.99 |
| Click `-` button when qty is 1 | 1 | 0 (removed) | Item removed | $0.00 |

## Test steps
1. Navigate to `/cart.html` with 1 item of quantity 1.
2. Locate the increase quantity button (`+`) in the item row.
3. Click the `+` button once.
4. Wait for the cart state to update.
5. Check displayed quantity and updated subtotal.
6. Locate the decrease quantity button (`-`) in the item row.
7. Click the `-` button once.
8. Check displayed quantity and subtotal.
9. Click the `-` button again when quantity is 1.
10. Check if item remains in the cart or is removed.

## Expected result
- Clicking `+` increases quantity to 2; item total updates to "$159.98"; subtotal updates to "$159.98".
- Clicking `-` decreases quantity back to 1; subtotal updates to "$79.99".
- Decreasing quantity below 1 (to 0) removes the item from the cart; cart displays the empty cart state.

## Status / Related bugs
Not Run / None
