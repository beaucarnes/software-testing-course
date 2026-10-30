# TC-CRT-006: Empty Cart Page Display and Start Shopping Redirect

## Requirement ID
FR-CART-006

## Module / Test type / Technique
Cart / GUI & Functional / Checklist

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart is empty (`DELETE /api/cart`).

## Test data
| Field | Value |
|---|---|
| Target URL | `http://localhost:3000/cart.html` |
| Expected Empty Text | "Your cart is empty" |
| CTA Button Text | "Start Shopping" |
| Target Redirect Link | `http://localhost:3000/` or `/` |

## Test steps
1. Clear cart state via `DELETE /api/cart`.
2. Navigate directly to `http://localhost:3000/cart.html`.
3. Check page content in the main container.
4. Verify empty cart message is visible.
5. Verify "Start Shopping" button is visible.
6. Click the "Start Shopping" button.
7. Observe resulting page URL and content.

## Expected result
- Cart table and checkout controls are hidden or replaced by the empty cart container.
- Text "Your cart is empty" is prominently displayed.
- "Start Shopping" button is visible and active.
- Clicking "Start Shopping" navigates the user back to the homepage (`/` or `/index.html`) where product cards are displayed.

## Status / Related bugs
Not Run / None
