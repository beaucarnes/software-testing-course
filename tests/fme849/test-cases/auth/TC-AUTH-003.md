# TC-AUTH-003: Register Account with Already Registered Email

## Requirement ID
FR-AUTH-001

## Module / Test type / Technique
Authentication / Functional / Equivalence Partitioning

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- An account with email `demo@techmart.com` is already registered in the system.
- User is on `/register.html`.

## Test data
| Field | Value |
|---|---|
| Full Name | "Duplicate Tester" |
| Email | "demo@techmart.com" |
| Password | "newpass123" |
| Confirm Password | "newpass123" |
| Expected Error Message | "Email already registered" |

## Test steps
1. Navigate to `http://localhost:3000/register.html`.
2. Enter "Duplicate Tester" into Full Name.
3. Enter existing email "demo@techmart.com" into Email.
4. Enter "newpass123" into Password and Confirm Password.
5. Click "Create Account" button.
6. Observe response message and UI feedback.

## Expected result
- Registration request fails with error "Email already registered".
- Backend returns HTTP 400 status.
- User remains on `/register.html`.
- Original demo account credentials remain unaltered.

## Status / Related bugs
Not Run / None
