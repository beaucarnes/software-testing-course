# TC-EDGE-002: Search Input with Whitespace Only

## Requirement ID
FR-PROD-003

## Module / Test type / Technique
Edge Cases & Security / Functional / Boundary Value Analysis

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage with 6 products loaded.

## Test data
| Field | Value |
|---|---|
| Whitespace Input 1 | `   ` (spaces only) |
| Whitespace Input 2 | `\t\t` (tabs) |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Enter multiple spaces (`   `) into `#searchInput`.
3. Click the Search button (`#searchBtn`).
4. Wait 500ms and observe `#productGrid`.
5. Enter tabs or mixed whitespace and click Search again.

## Expected result
- The application trims or handles whitespace input safely without uncaught runtime errors.
- Either all products remain displayed or the search treats it predictably as an empty query without breaking the layout.
- The UI controls (filter, sort, search) remain functional.

## Status / Related bugs
Not Run / None
