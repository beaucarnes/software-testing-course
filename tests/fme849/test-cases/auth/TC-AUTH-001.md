# TC-AUTH-001: Register New Account with Valid Credentials

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
| Full Name | "Jane Smith" |
| Email | "jane.smith.[timestamp]@example.com" (unique email) |
| Password | "securepassword123" |
| Confirm Password | "securepassword123" |

## Test steps
1. Navigate to `http://localhost:3000/register.html`.
2. Verify registration form elements are displayed.
3. Enter Full Name into `#name`.
4. Enter unique Email into `#email`.
5. Enter Password into `#password`.
6. Enter matching Password into `#confirmPassword`.
7. Click the "Create Account" button (`#registerBtn`).
8. Observe toast notification and subsequent page redirect.
9. Verify navbar user greeting on the homepage.

## Expected result
- Success toast notification appears confirming registration.
- User is automatically redirected to the homepage (`/` or `/index.html`).
- The navbar displays "Hi, Jane Smith" and a "Logout" button.
- User session is authenticated.

## Status / Related bugs
Not Run / None
