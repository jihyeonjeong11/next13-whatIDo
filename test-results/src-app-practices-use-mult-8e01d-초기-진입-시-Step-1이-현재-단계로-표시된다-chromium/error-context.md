# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - navigation "Breadcrumb" [ref=e4]:
        - link "Home" [ref=e5] [cursor=pointer]:
          - /url: /
          - img [ref=e6]
          - generic [ref=e9]: Home
        - img [ref=e10]
        - link "Blogs" [ref=e12] [cursor=pointer]:
          - /url: /docs
      - button "Toggle theme" [ref=e13] [cursor=pointer]:
        - img [ref=e14]
  - paragraph [ref=e17]: use-multistep-form
  - button "Open Next.js Dev Tools" [ref=e23] [cursor=pointer]:
    - img [ref=e24]
  - alert [ref=e27]
```