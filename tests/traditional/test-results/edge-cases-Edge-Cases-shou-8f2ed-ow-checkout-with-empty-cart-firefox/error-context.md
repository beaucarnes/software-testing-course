# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "🛒 TechMart" [ref=e4] [cursor=pointer]:
        - /url: /
      - generic [ref=e5]:
        - link "Continue Shopping" [ref=e6] [cursor=pointer]:
          - /url: /
        - generic [ref=e7]:
          - link "Login" [ref=e8] [cursor=pointer]:
            - /url: /login.html
          - link "Sign Up" [ref=e9] [cursor=pointer]:
            - /url: /register.html
  - main [ref=e10]:
    - heading "Your Shopping Cart" [level=1] [ref=e11]
    - generic [ref=e12]:
      - paragraph [ref=e13]: Your cart is empty
      - link "Start Shopping" [ref=e14] [cursor=pointer]:
        - /url: /
```