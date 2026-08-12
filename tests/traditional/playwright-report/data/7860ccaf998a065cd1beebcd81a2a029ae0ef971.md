# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "🛒 TechMart" [ref=e4] [cursor=pointer]:
        - /url: /
      - link "🛒 Cart (0)" [ref=e6] [cursor=pointer]:
        - /url: /cart.html
  - main [ref=e7]:
    - generic [ref=e8]:
      - heading "Create Your Account" [level=1] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Full Name
          - textbox "Full Name" [ref=e13]:
            - /placeholder: John Doe
            - text: Another User
        - generic [ref=e14]:
          - generic [ref=e15]: Email Address
          - textbox "Email Address" [ref=e16]:
            - /placeholder: you@example.com
            - text: demo@techmart.com
        - generic [ref=e17]:
          - generic [ref=e18]: Password
          - textbox "Password" [ref=e19]:
            - /placeholder: Create a password
            - text: password123
        - generic [ref=e20]:
          - generic [ref=e21]: Confirm Password
          - textbox "Confirm Password" [active] [ref=e22]:
            - /placeholder: Confirm your password
        - button "Create Account" [ref=e23] [cursor=pointer]
      - paragraph [ref=e24]:
        - text: Already have an account?
        - link "Login here" [ref=e25] [cursor=pointer]:
          - /url: /login.html
```