# TC-AUTH-005: Login Failure with Incorrect Password

## Requirement ID
FR-AUTH-002

## Module / Test type / Technique
Authentication / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is on the login page (`/login.html`).

## Test data
| Field | Value |
|---|---|
| Email | "demo@techmart.com" |
| Password | "wrongpassword" |
| Expected Error Message | "Invalid credentials" |

## Test steps
1. Navigate to `http://localhost:3000/login.html`.
2. Enter "demo@techmart.com" into the email field.
3. Enter "wrongpassword" into the password field.
4. Click the "Login" button.
5. Observe error alert or toast on the page.
6. Verify browser location URL.

## Expected result
- Error message displays "Invalid credentials".
- Backend returns HTTP 401 Unauthorized status.
- User remains on the login page (`/login.html`).
- User is not logged in (`GET /api/user` remains 401).

## Status / Related bugs
Not Run / None
