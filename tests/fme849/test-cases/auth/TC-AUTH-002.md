# TC-AUTH-002: Register Account with Mismatched Passwords

## Requirement ID
FR-AUTH-001

## Module / Test type / Technique
Authentication / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the registration page (`/register.html`).

## Test data
| Field | Value |
|---|---|
| Full Name | "Test User" |
| Email | "mismatch@example.com" |
| Password | "password123" |
| Confirm Password | "different456" |
| Expected Error Message | "Passwords do not match" |

## Test steps
1. Navigate to `http://localhost:3000/register.html`.
2. Enter "Test User" into Full Name field.
3. Enter "mismatch@example.com" into Email field.
4. Enter "password123" into Password field.
5. Enter "different456" into Confirm Password field.
6. Click the "Create Account" button.
7. Observe error alert or toast on the page.
8. Check browser current URL.

## Expected result
- Error message displays "Passwords do not match".
- Registration is blocked; no account is created.
- User remains on `/register.html`.
- No redirect or login occurs.

## Status / Related bugs
Not Run / None
