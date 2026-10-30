# TC-EDGE-001: Search Input Resilience Against Script Injection (XSS)

## Requirement ID
NFR-SEC-002

## Module / Test type / Technique
Edge Cases & Security / Security / Injection Testing

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the homepage.

## Test data
| Field | Value |
|---|---|
| Search Payload 1 | `<script>alert("xss")</script>` |
| Search Payload 2 | `"><img src=x onerror=alert(1)>` |

## Test steps
1. Navigate to `http://localhost:3000/`.
2. Locate the search input (`#searchInput`).
3. Enter `<script>alert("xss")</script>` into the search field.
4. Click the Search button (`#searchBtn`).
5. Wait 1 second to observe whether any unexpected browser alert dialog is triggered.
6. Check the DOM to verify how the payload is handled and rendered.
7. Clear and enter `"><img src=x onerror=alert(1)>`.
8. Click Search again and monitor browser dialog events.

## Expected result
- No JavaScript alert dialog pops up.
- The input is safely treated as a literal search string.
- The product grid displays "No products found matching your criteria." or empty results.
- The page structure and functionality remain intact without script execution.

## Status / Related bugs
Not Run / None
