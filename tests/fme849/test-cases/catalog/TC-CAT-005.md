# TC-CAT-005: Filter Products by Maximum Price Slider

## Requirement ID
FR-PROD-005

## Module / Test type / Technique
Catalog / Functional / Boundary Value Analysis

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Max Price Slider Value | 50 |
| Products Expected to be Visible | "USB-C Hub" ($49.99), "Mouse Pad XL" ($24.99) |
| Products Expected to be Hidden | "Mechanical Keyboard" ($129.99), "Wireless Headphones" ($79.99) |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the price range slider (`#priceFilter`) and price display label (`#priceValue`).
3. Set the slider value to `50` and dispatch input change.
4. Verify the label displays "$50".
5. Wait for the product list to filter.
6. Verify the prices of all visible product cards.

## Expected result
- Price label displays "$50".
- Only products with a price `<= $50.00` are displayed (USB-C Hub at $49.99 and Mouse Pad XL at $24.99).
- Products with prices greater than $50.00 are excluded from the grid.

## Status / Related bugs
Not Run / None
