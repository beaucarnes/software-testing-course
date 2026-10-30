# TC-CHK-001: Complete Full End-to-End Checkout with Valid Shipping & Payment

## Requirement ID
FR-CHK-001

## Module / Test type / Technique
Checkout / Functional (E2E) / Decision Table

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Session cart has at least 1 item (e.g. "Wireless Headphones").
- User is on the checkout page (`/checkout.html`).

## Test data
| Field | Value |
|---|---|
| First Name | "John" |
| Last Name | "Doe" |
| Street Address | "123 Main Street" |
| City | "Grand Rapids" |
| State | "MI" |
| ZIP Code | "49501" |
| Phone Number | "555-123-4567" |
| Name on Card | "John Doe" |
| Card Number | "4111 1111 1111 1111" |
| Expiration Date | "12/28" |
| CVV | "123" |

## Test steps
1. Add "Wireless Headphones" to cart and navigate to `/checkout.html`.
2. Fill in all Shipping Information fields with test data.
3. Fill in all Payment Information fields with test data.
4. Verify Order Summary sidebar displays correct items, subtotal, tax, and total.
5. Click the "Place Order" button (`#placeOrderBtn`).
6. Wait for the order confirmation modal (`#orderConfirmation`) to appear.
7. Verify confirmation text and generated Order ID.

## Expected result
- Order confirmation modal is displayed.
- Modal contains heading "🎉 Order Confirmed!".
- An Order ID is generated and visible (`#orderId`).
- User's cart is cleared.
- Subsequent visit to `/cart.html` shows empty cart.

## Status / Related bugs
Not Run / None
