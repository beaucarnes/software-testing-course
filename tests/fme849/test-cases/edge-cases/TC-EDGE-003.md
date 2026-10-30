# TC-EDGE-003: Responsive Layout and Mobile Navigation on Small Screens

## Requirement ID
NFR-COMPAT-001

## Module / Test type / Technique
Edge Cases & Security / Compatibility / Responsive Checklist

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- Browser or emulation viewport configured to mobile dimensions (e.g. 375x667 px).

## Test data
| Viewport Dimension | 375px width × 667px height (iPhone SE / Mobile viewport) |
| Pages Checked | `/`, `/cart.html`, `/checkout.html` |

## Test steps
1. Set browser viewport size to 375 × 667.
2. Navigate to `http://localhost:3000/`.
3. Verify navbar, logo, and cart link are visible and properly aligned.
4. Verify product cards reflow into a clean single or double-column mobile layout.
5. Check if any horizontal scrollbar appears on the root document.
6. Click "Add to Cart" on a product card using touch/click.
7. Tap the cart link in the navbar to open `/cart.html`.
8. Verify cart table and buttons are readable and usable on mobile.

## Expected result
- No unexpected horizontal scrolling occurs on mobile viewports.
- All product images, text labels, and buttons are responsive, touch-friendly, and unobstructed.
- Navigation between homepage, cart, and checkout works smoothly on mobile.

## Status / Related bugs
Not Run / None
