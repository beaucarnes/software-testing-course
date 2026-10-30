# TC-CHK-002: Checkout Form Validation for Mandatory Shipping Fields

## Requirement ID
FR-CHK-001

## Module / Test type / Technique
Checkout / Functional / Boundary Value Analysis

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart has 1 item.
- User is on `/checkout.html`.

## Test data
| Field | Value |
|---|---|
| First Name | "Jane" |
| Last Name | "" (Empty) |
| Street Address | "" (Empty) |
| City | "" (Empty) |
| ZIP Code | "" (Empty) |

## Test steps
1. Navigate to `/checkout.html` with items in cart.
2. Enter First Name "Jane" but leave required fields (Address, City, ZIP) blank.
3. Attempt to submit the form by clicking "Place Order".
4. Check browser HTML5 validation state on invalid inputs.
5. If submitting via API payload with missing `address`, `city`, or `zip`, inspect API response.

## Expected result
- Browser blocks form submission and flags missing required inputs.
- API returns HTTP 400 Bad Request `{ error: "Shipping information required" }`.
- No order is created; stock is not decremented; cart items remain intact.

## Status / Related bugs
Not Run / None
