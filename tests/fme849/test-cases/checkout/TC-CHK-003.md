# TC-CHK-003: Prevent Checkout When Cart Is Empty

## Requirement ID
FR-CHK-003

## Module / Test type / Technique
Checkout / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart is empty (`DELETE /api/cart`).

## Test data
| Field | Value |
|---|---|
| Target URL | `http://localhost:3000/checkout.html` |
| Expected Redirect | `/cart.html` |

## Test steps
1. Clear session cart (`DELETE /api/cart`).
2. Attempt to navigate directly to `http://localhost:3000/checkout.html`.
3. Observe page redirection logic.
4. Additionally, issue a direct `POST /api/checkout` request with valid shipping payload when cart is empty.
5. Check the HTTP response status code and message.

## Expected result
- Client script detects empty cart (`data.items.length === 0`) and automatically redirects user to `/cart.html`.
- Direct API invocation responds with HTTP 400 Bad Request and error message `{ error: "Cart is empty" }`.
- No order record is generated.

## Status / Related bugs
Not Run / None
