# TC-CRT-001: Add Product to Cart from Homepage Grid

## Requirement ID
FR-CART-002

## Module / Test type / Technique
Cart / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart is empty (initial state or cleared via `DELETE /api/cart`).
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Target Product | First product card (e.g. "Wireless Headphones") |
| Initial Cart Badge | "0" |
| Expected Toast Message | "Added to cart" |
| Expected Cart Badge After Add | "1" |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Verify the cart icon in navbar displays "0" (`#cartCount`).
3. Locate the first product card on the grid.
4. Click the "Add to Cart" button on the first product.
5. Observe the notification toast (`#toast`).
6. Observe the cart count badge in the navbar (`#cartCount`).

## Expected result
- A toast notification appears displaying "Added to cart".
- The cart count badge in the navbar increments from "0" to "1".
- The page does not trigger a full browser reload.

## Status / Related bugs
Not Run / None
