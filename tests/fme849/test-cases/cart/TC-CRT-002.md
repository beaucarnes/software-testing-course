# TC-CRT-002: Add Same Product Multiple Times and Verify Quantity Increment

## Requirement ID
FR-CART-002

## Module / Test type / Technique
Cart / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart is cleared (`DELETE /api/cart`).
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Target Product | First product card |
| Number of Clicks | 3 |
| Expected Navbar Badge | "3" |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the "Add to Cart" button of the first product card.
3. Click the "Add to Cart" button once and wait for toast confirmation.
4. Click the "Add to Cart" button a second time.
5. Click the "Add to Cart" button a third time.
6. Verify the navbar cart badge count.
7. Click the cart link in navbar to navigate to `/cart.html`.
8. Verify the quantity column for the added product.

## Expected result
- Cart count badge in navbar shows "3".
- On the `/cart.html` page, there is only 1 row for this product (no duplicate rows created).
- The item quantity displays `3`.

## Status / Related bugs
Not Run / None
