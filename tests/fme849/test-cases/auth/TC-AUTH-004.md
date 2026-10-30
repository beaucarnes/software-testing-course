# TC-AUTH-004: Login with Valid Demo Credentials

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
| Password | "demo123" |
| Target User Name | "Demo User" |

## Test steps
1. Navigate to `http://localhost:3000/login.html`.
2. Verify login form and demo credentials helper are displayed.
3. Enter "demo@techmart.com" into the email input (`#email`).
4. Enter "demo123" into the password input (`#password`).
5. Click the "Login" button (`#loginBtn`).
6. Observe notification and wait for redirection to the homepage.
7. Inspect the authentication area in the navigation bar (`#authArea`).

## Expected result
- A success notification is displayed.
- User is redirected to `/` or `/index.html`.
- The navbar displays "Hi, Demo User".
- A "Logout" button is visible in place of "Sign In" / "Register".
- Calling `GET /api/user` returns HTTP 200 with the demo user profile.

## Status / Related bugs
Not Run / None
