# TC-AUTH-006: User Logout and Header State Reset

## Requirement ID
FR-AUTH-005

## Module / Test type / Technique
Authentication / Functional / State Transition

## Preconditions
- The TechMart application server is running at `http://localhost:3000`.
- User is currently logged in as "Demo User".
- User is on `http://localhost:3000/`.

## Test data
| Field | Value |
|---|---|
| Current User Greeting | "Hi, Demo User" |
| Logout Trigger | `#logoutBtn` click |

## Test steps
1. Verify user is authenticated and "Hi, Demo User" is visible in the header.
2. Locate the "Logout" button in `#authArea`.
3. Click the "Logout" button.
4. Wait for the logout request to complete.
5. Inspect the `#authArea` elements.
6. Verify visibility of "Sign In" and "Register" links.

## Expected result
- Backend terminates the authenticated session (`req.session.currentUser` set to null).
- "Hi, Demo User" and "Logout" button are removed from the DOM.
- "Sign In" (link to `/login.html`) and "Register" (link to `/register.html`) buttons are displayed.
- Calling `GET /api/user` returns HTTP 401 Unauthorized.

## Status / Related bugs
Not Run / None
