# TC-CRT-005: Remove Single Item from Cart Using Delete Button

## Requirement ID
FR-CART-004

## Module / Test type / Technique
Cart / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart has 2 distinct products ("Wireless Headphones" and "USB-C Hub").
- User is on `/cart.html`.

## Test data
| Field | Value |
|---|---|
| Target Item to Remove | "Wireless Headphones" |
| Retained Item | "USB-C Hub" ($49.99) |
| Expected New Cart Total | "$49.99" |

## Test steps
1. Navigate to `/cart.html` with the 2 items loaded.
2. Locate the remove button (`✕` / `.remove-item-btn`) on the "Wireless Headphones" row.
3. Click the remove button.
4. Wait for the cart view to update.
5. Verify the remaining items in the cart table.
6. Verify the updated subtotal and total values.

## Expected result
- "Wireless Headphones" is removed from the cart table.
- "USB-C Hub" remains in the cart table.
- Total updates from "$129.98" to "$49.99".
- Navbar cart count badge updates from "2" to "1".

## Status / Related bugs
Not Run / None
